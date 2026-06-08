import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { collections } from "./models.mjs";
import { seedData } from "./seed-data.mjs";

const localPath = resolve("data/cms-db.json");

function mongoConfig() {
  const { MONGODB_DATA_API_URL, MONGODB_DATA_API_KEY, MONGODB_DATA_SOURCE, MONGODB_DATABASE } = process.env;
  if (!MONGODB_DATA_API_URL || !MONGODB_DATA_API_KEY || !MONGODB_DATA_SOURCE || !MONGODB_DATABASE) return null;
  return { url: MONGODB_DATA_API_URL, key: MONGODB_DATA_API_KEY, source: MONGODB_DATA_SOURCE, database: MONGODB_DATABASE };
}

async function mongo(action, body) {
  const config = mongoConfig();
  if (!config) return null;
  const response = await fetch(`${config.url}/action/${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apiKey: config.key },
    body: JSON.stringify({ dataSource: config.source, database: config.database, ...body }),
  });
  if (!response.ok) throw new Error(`MongoDB Data API error: ${response.status}`);
  return response.json();
}

async function readLocal() {
  if (!existsSync(localPath)) {
    await mkdir(dirname(localPath), { recursive: true });
    await writeFile(localPath, JSON.stringify(seedData, null, 2));
  }
  const raw = await readFile(localPath, "utf8");
  return JSON.parse(raw);
}

async function writeLocal(data) {
  await mkdir(dirname(localPath), { recursive: true });
  await writeFile(localPath, JSON.stringify(data, null, 2));
}

export async function list(collection) {
  assertCollection(collection);
  const result = await mongo("find", { collection, filter: {} });
  if (result) return result.documents || [];
  const data = await readLocal();
  return data[collection] || [];
}

export async function create(collection, item) {
  assertCollection(collection);
  const now = new Date().toISOString();
  const record = { id: item.id || crypto.randomUUID(), createdAt: item.createdAt || now, updatedAt: now, ...item };
  const result = await mongo("insertOne", { collection, document: record });
  if (result) return record;
  const data = await readLocal();
  data[collection] = [record, ...(data[collection] || [])];
  await writeLocal(data);
  return record;
}

export async function update(collection, id, patch) {
  assertCollection(collection);
  const updatedAt = new Date().toISOString();
  const result = await mongo("updateOne", { collection, filter: { id }, update: { $set: { ...patch, updatedAt } } });
  if (result) return { id, ...patch, updatedAt };
  const data = await readLocal();
  data[collection] = (data[collection] || []).map((item) => (item.id === id || item._id === id ? { ...item, ...patch, updatedAt } : item));
  await writeLocal(data);
  return data[collection].find((item) => item.id === id || item._id === id);
}

export async function remove(collection, id) {
  assertCollection(collection);
  const result = await mongo("deleteOne", { collection, filter: { id } });
  if (result) return { deleted: true };
  const data = await readLocal();
  data[collection] = (data[collection] || []).filter((item) => item.id !== id && item._id !== id);
  await writeLocal(data);
  return { deleted: true };
}

function assertCollection(collection) {
  if (!collections.includes(collection)) throw new Error(`Unknown collection: ${collection}`);
}
