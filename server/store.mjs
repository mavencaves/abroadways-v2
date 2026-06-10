import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { MongoClient, ObjectId } from "mongodb";
import { collections } from "./models.mjs";
import { seedData } from "./seed-data.mjs";

const localPath = resolve("data/cms-db.json");
const databaseName = "abroadways_v2";

let mongoClient;
let mongoDb;
let mongoReady;

function hasMongoUri() {
  return Boolean(process.env.MONGODB_URI);
}

async function getMongoDb() {
  if (!hasMongoUri()) return null;
  if (mongoDb) return mongoDb;
  if (!mongoReady) {
    mongoReady = (async () => {
      mongoClient = new MongoClient(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      });
      await mongoClient.connect();
      mongoDb = mongoClient.db(databaseName);
      await ensureMongoCollections();
      await seedMongoIfNeeded();
      return mongoDb;
    })();
  }
  return mongoReady;
}

async function ensureMongoCollections() {
  const existing = new Set((await mongoDb.listCollections().toArray()).map((item) => item.name));
  for (const collection of collections) {
    if (!existing.has(collection)) await mongoDb.createCollection(collection);
    await mongoDb.collection(collection).createIndex({ id: 1 }, { unique: true, sparse: true });
    if (["pages", "countries", "blogs"].includes(collection)) {
      await mongoDb.collection(collection).createIndex({ slug: 1 }, { sparse: true });
      await mongoDb.collection(collection).createIndex({ status: 1 }, { sparse: true });
    }
  }
}

async function seedMongoIfNeeded() {
  const home = seedData.pages.find((page) => page.routeKey === "home");
  if (home && (await mongoDb.collection("pages").countDocuments({ routeKey: "home" })) === 0) {
    await mongoDb.collection("pages").insertOne(stampSeed(home));
  }

  for (const country of seedData.countries) {
    await mongoDb.collection("countries").updateOne(
      { slug: country.slug },
      { $setOnInsert: stampSeed(country) },
      { upsert: true },
    );
  }

  const settings = seedData.settings[0];
  if (settings && (await mongoDb.collection("settings").countDocuments({ id: settings.id || "site" })) === 0) {
    await mongoDb.collection("settings").insertOne(stampSeed(settings));
  }
}

function stampSeed(item) {
  const now = new Date().toISOString();
  return {
    createdAt: item.createdAt || now,
    updatedAt: item.updatedAt || now,
    ...item,
  };
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

function normalizeDocument(document) {
  if (!document) return document;
  return {
    ...document,
    _id: document._id?.toString?.() || document._id,
  };
}

function mongoIdFilter(id) {
  const filters = [{ id }];
  if (ObjectId.isValid(id)) filters.push({ _id: new ObjectId(id) });
  return { $or: filters };
}

export async function list(collection) {
  assertCollection(collection);
  const db = await getMongoDb();
  if (db) {
    const items = await db.collection(collection).find({}).sort({ updatedAt: -1, createdAt: -1 }).toArray();
    return items.map(normalizeDocument);
  }
  const data = await readLocal();
  return data[collection] || [];
}

export async function get(collection, id) {
  assertCollection(collection);
  const db = await getMongoDb();
  if (db) {
    return normalizeDocument(await db.collection(collection).findOne(mongoIdFilter(id)));
  }
  const data = await readLocal();
  return (data[collection] || []).find((item) => item.id === id || item._id === id) || null;
}

export async function create(collection, item) {
  assertCollection(collection);
  const db = await getMongoDb();
  const now = new Date().toISOString();
  const record = { id: item.id || randomUUID(), createdAt: item.createdAt || now, updatedAt: now, ...item };
  if (db) {
    await db.collection(collection).insertOne(record);
    return normalizeDocument(record);
  }
  const data = await readLocal();
  data[collection] = [record, ...(data[collection] || [])];
  await writeLocal(data);
  return record;
}

export async function update(collection, id, patch) {
  assertCollection(collection);
  const db = await getMongoDb();
  const updatedAt = new Date().toISOString();
  const updatePatch = { ...patch, updatedAt };
  if (db) {
    await db.collection(collection).updateOne(mongoIdFilter(id), { $set: updatePatch });
    return normalizeDocument(await db.collection(collection).findOne(mongoIdFilter(id)));
  }
  const data = await readLocal();
  data[collection] = (data[collection] || []).map((item) => (item.id === id || item._id === id ? { ...item, ...updatePatch } : item));
  await writeLocal(data);
  return data[collection].find((item) => item.id === id || item._id === id);
}

export async function remove(collection, id) {
  assertCollection(collection);
  const db = await getMongoDb();
  if (db) {
    await db.collection(collection).deleteOne(mongoIdFilter(id));
    return { deleted: true };
  }
  const data = await readLocal();
  data[collection] = (data[collection] || []).filter((item) => item.id !== id && item._id !== id);
  await writeLocal(data);
  return { deleted: true };
}

export async function storageStatus() {
  const db = await getMongoDb();
  return {
    driver: db ? "mongodb" : "local-json",
    database: db ? databaseName : null,
    collections,
  };
}

function assertCollection(collection) {
  if (!collections.includes(collection)) throw new Error(`Unknown collection: ${collection}`);
}
