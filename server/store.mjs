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
    if (["pages", "countries", "blogs", "universities", "courses", "scholarships"].includes(collection)) {
      await mongoDb.collection(collection).createIndex({ slug: 1 }, { sparse: true });
      await mongoDb.collection(collection).createIndex({ status: 1 }, { sparse: true });
    }
  }
}

async function seedMongoIfNeeded() {
  for (const page of seedData.pages) {
    await mongoDb.collection("pages").updateOne(
      { $or: [{ id: page.id }, { routeKey: page.routeKey }, { slug: page.slug }].filter((filter) => Object.values(filter)[0]) },
      { $setOnInsert: stampSeed(page) },
      { upsert: true },
    );
  }
  await backfillHomeSections();

  for (const country of seedData.countries) {
    await mongoDb.collection("countries").updateOne(
      { slug: country.slug },
      { $setOnInsert: stampSeed(country) },
      { upsert: true },
    );
  }
  await backfillCountryDefaults();

  for (const blog of seedData.blogs) {
    await mongoDb.collection("blogs").updateOne(
      { $or: [{ id: blog.id }, { slug: blog.slug }].filter((filter) => Object.values(filter)[0]) },
      { $setOnInsert: stampSeed(blog) },
      { upsert: true },
    );
  }

  for (const collection of ["universities", "courses", "scholarships"]) {
    for (const item of seedData[collection] || []) {
      await mongoDb.collection(collection).updateOne(
        { $or: [{ id: item.id }, { slug: item.slug }].filter((filter) => Object.values(filter)[0]) },
        { $setOnInsert: stampSeed(item) },
        { upsert: true },
      );
    }
  }

  for (const media of seedData.media) {
    await mongoDb.collection("media").updateOne(
      { $or: [{ id: media.id }, { url: media.url }].filter((filter) => Object.values(filter)[0]) },
      { $setOnInsert: stampSeed(media) },
      { upsert: true },
    );
  }

  const settings = seedData.settings[0];
  if (settings && (await mongoDb.collection("settings").countDocuments({ id: settings.id || "site" })) === 0) {
    await mongoDb.collection("settings").insertOne(stampSeed(settings));
  }
  await backfillSettingsDefaults();
}

async function backfillHomeSections() {
  const seedHome = seedData.pages.find((page) => page.routeKey === "home");
  if (!seedHome?.bodySections?.length) return;
  const home = await mongoDb.collection("pages").findOne({ $or: [{ routeKey: "home" }, { slug: "/" }, { id: "home" }] });
  if (!home) return;
  const currentSections = Array.isArray(home.bodySections) ? home.bodySections : [];
  const currentKeys = new Set(currentSections.map((section) => section?.type || section?.key).filter(Boolean));
  const missing = seedHome.bodySections.filter((section) => !currentKeys.has(section.type) && !currentKeys.has(section.key));
  const upgradedHome = upgradeHomeDefaults(home, seedHome);
  if (!missing.length && !upgradedHome.changed) return;
  const lastOrder = currentSections.reduce((max, section) => Math.max(max, Number(section?.order || 0)), 0);
  const additions = missing.map((section, index) => ({ ...section, order: homeSectionBackfillOrder(section, lastOrder + index + 1) }));
  await mongoDb.collection("pages").updateOne(
    { _id: home._id },
    { $set: { ...upgradedHome.patch, bodySections: [...upgradedHome.sections, ...additions], updatedAt: new Date().toISOString() } },
  );
}

async function backfillSettingsDefaults() {
  const seedSettings = seedData.settings[0];
  if (!seedSettings) return;
  const settings = await mongoDb.collection("settings").findOne({ $or: [{ id: seedSettings.id || "site" }, { siteName: "Abroadways" }] });
  if (!settings) return;
  const patch = settingsDefaultsPatch(settings, seedSettings);
  if (!Object.keys(patch).length) return;
  await mongoDb.collection("settings").updateOne(
    { _id: settings._id },
    { $set: { ...patch, updatedAt: new Date().toISOString() } },
  );
}

async function backfillCountryDefaults() {
  for (const seedCountry of seedData.countries || []) {
    const country = await mongoDb.collection("countries").findOne({ slug: seedCountry.slug });
    if (!country) continue;
    const patch = missingDefaultsPatch(country, seedCountry, [
      "heroCtaText",
      "heroCtaLink",
      "heroImages",
      "heroMainImageUrl",
      "heroSideImageUrl1",
      "heroSideImageUrl2",
      "displayOrder",
      "sectionsNav",
      "overviewSection",
      "countryFacts",
      "factsAndFiguresTable",
      "whyStudy",
      "educationSystem",
      "topUniversitiesTable",
      "topCollegesTable",
      "topSubjects",
      "tuitionAndCost",
      "scholarshipsSection",
      "postStudyPathways",
      "finalCta",
      "averageTuitionMin",
      "averageTuitionMax",
      "livingCostMin",
      "livingCostMax",
      "currency",
      "languageRequirement",
      "scholarshipNote",
      "postStudyNote",
      "workWhileStudyingNote",
      "bestFor",
      "popularSubjects",
      "applicationTimeline",
    ]);
    if (!Object.keys(patch).length) continue;
    await mongoDb.collection("countries").updateOne(
      { _id: country._id },
      { $set: { ...patch, updatedAt: new Date().toISOString() } },
    );
  }
}

function missingDefaultsPatch(current = {}, seed = {}, keys = []) {
  const patch = {};
  for (const key of keys) {
    const value = current[key];
    const missing = value === undefined || value === null || value === "" || (Array.isArray(value) && !value.length);
    if (missing && seed[key] !== undefined) patch[key] = seed[key];
  }
  return patch;
}

function settingsDefaultsPatch(settings = {}, seedSettings = {}) {
  const patch = {};
  const shouldPatchTagline = (value) => {
    const normalized = String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
    return !normalized || normalized === "your pathway to global education" || normalized.includes("languagecert") || normalized.includes("test centre") || normalized.includes("test center");
  };
  for (const key of ["navbarTaglineText", "navbarTagline", "logoCaption", "logoTagline", "footerTaglineText", "footerTagline"]) {
    if (shouldPatchTagline(settings[key])) patch[key] = seedSettings[key];
  }
  if (!settings.navbarTaglineColor || settings.navbarTaglineColor === "#0057D9") patch.navbarTaglineColor = seedSettings.navbarTaglineColor;
  if (!settings.footerTaglineColor || settings.footerTaglineColor === "#0057D9") patch.footerTaglineColor = seedSettings.footerTaglineColor;
  if (!Array.isArray(settings.partners) || !settings.partners.length) {
    patch.partners = seedSettings.partners;
  } else {
    const nextPartners = settings.partners.map((partner) => partnerDefaultsPatch(partner, seedSettings.partners));
    if (JSON.stringify(nextPartners) !== JSON.stringify(settings.partners)) patch.partners = nextPartners;
  }
  return patch;
}

function partnerDefaultsPatch(partner = {}, seedPartners = []) {
  const name = String(partner.partnerName || partner.name || "").toLowerCase();
  const seedName = name === "more verified partners" ? "other partners" : name;
  const seed = seedPartners.find((item) => String(item.partnerName || "").toLowerCase() === seedName);
  if (!seed) return partner;
  const next = { ...partner };
  const claim = String(next.statusText || next.authorizationText || "").trim();
  const oldLanguageCertClaims = ["UKVI Approved LanguageCert Test Centre", "Authorized LanguageCert Test Centre", "Authorized Testing Center"];
  if (name === "languagecert" && (!claim || oldLanguageCertClaims.includes(claim) || claim.toLowerCase().includes("languagecert"))) {
    next.statusText = seed.statusText || seed.authorizationText;
    next.authorizationText = seed.authorizationText;
    next.description = seed.description;
  }
  if (name === "pearson vue" && (!claim || ["Authorized Pearson VUE Test Center", "Authorized Test Centers"].includes(claim))) {
    next.statusText = seed.statusText || seed.authorizationText;
    next.authorizationText = seed.authorizationText;
    next.description = seed.description;
  }
  if ((name === "more verified partners" || name === "other partners") && (!claim || ["Add partner details from CMS", "Coming Soon / To be updated"].includes(claim))) {
    next.partnerName = seed.partnerName;
    next.statusText = seed.statusText || seed.authorizationText;
    next.authorizationText = seed.authorizationText;
    next.description = seed.description;
  }
  if (!next.partnerLogoAlt) next.partnerLogoAlt = seed.partnerLogoAlt;
  return next;
}

function homeSectionBackfillOrder(section = {}, fallbackOrder) {
  const key = section.type || section.key;
  const priority = {
    successMetrics: 1.5,
    "success-metrics": 1.5,
    servicesPreview: 5,
    "services-preview": 5,
    academyTeaser: 6,
    "academy-teaser": 6,
    successStories: 7,
    "success-stories": 7,
    serviceChips: 8,
    "service-bubbles": 8,
    insightsSection: 9,
    "insights-section": 9,
    consultationForm: 10,
    "consultation-form": 10,
    blogPreview: 11,
    "blog-preview": 11,
    resourceTiles: 12,
    "resource-tiles": 12,
  };
  return priority[key] || fallbackOrder;
}

function upgradeHomeDefaults(home, seedHome) {
  const seedSections = new Map();
  for (const section of seedHome.bodySections) {
    if (section.key) seedSections.set(section.key, section);
    if (section.type) seedSections.set(section.type, section);
  }
  const patch = {};
  if (["Plan Your Study Abroad Journey with Abroadways", "Plan Your Study Abroad Journey with AbroadWays", "Your Study Abroad Journey Starts Here"].includes(home.heroHeading)) patch.heroHeading = seedHome.heroHeading;
  const sections = (Array.isArray(home.bodySections) ? home.bodySections : []).map((section) => {
    const key = section?.key || section?.type;
    const seedSection = seedSections.get(key);
    if (!seedSection) return section;
    const next = { ...section };
    if (key === "hero" && ["Plan Your Study Abroad Journey with Abroadways", "Plan Your Study Abroad Journey with AbroadWays", "Your Study Abroad Journey Starts Here"].includes(next.heading)) next.heading = seedSection.heading;
    if (key === "hero" && next.secondaryButtonText === "Explore Destinations") next.secondaryButtonText = seedSection.secondaryButtonText;
    if (key === "feature-cards" || key === "featureCards") {
      next.cards = upgradeFeatureCardDefaults(next.cards, seedSection.cards);
    }
    if ((key === "success-stories" || key === "successStories") && (next.heading === "Our Student Journeys" || next.title === "Our Student Journeys")) {
      if (next.heading === "Our Student Journeys") next.heading = seedSection.heading;
      if (next.title === "Our Student Journeys") next.title = seedSection.title;
    }
    if (key === "resource-tiles" || key === "resourceTiles") {
      const titles = Array.isArray(next.items) ? next.items.map((item) => item?.title).join("|") : "";
      if (titles === "Free Guides|University Map|Success Stories|Prospectus|Our Blog") next.items = seedSection.items;
    }
    if (key === "academy-teaser" || key === "academyTeaser") {
      if (next.heading === "Abroadways Academy is coming soon") next.heading = seedSection.heading;
      if (next.title === "Abroadways Academy is coming soon") next.title = seedSection.title;
      if (next.subtitle === "A dedicated exam preparation and academic readiness platform for students planning international education.") next.subtitle = seedSection.subtitle;
      const cardTitles = Array.isArray(next.cards) ? next.cards.map((item) => item?.title).join("|") : "";
      const missingLogoFields = Array.isArray(next.cards) && next.cards.some((item) => !("examLogoUrl" in item) || !("statusBadge" in item));
      if (["IELTS|TOEFL|GRE|GMAT|LanguageCert|PTE|ELLT", "IELTS|TOEFL|GRE|GMAT|LanguageCert|PTE|ELLT|More Programs", "IELTS|TOEFL|GRE|GMAT|LanguageCert|PTE|ELLT|Other Programs"].includes(cardTitles) || missingLogoFields) next.cards = seedSection.cards;
    }
    if (key === "insights-section" || key === "insightsSection") {
      if (next.heading === "Abroadways Study Abroad Insights") next.heading = seedSection.heading;
    }
    if (key === "trust-section" || key === "trustSection") {
      const hasLegacyTrust = Array.isArray(next.trustItems) && next.trustItems.some((item) => item?.title === "UKVI Approved LanguageCert Test Centre");
      if (hasLegacyTrust) next.trustItems = seedSection.trustItems;
    }
    return next;
  });
  const changed = Object.keys(patch).length > 0 || JSON.stringify(sections) !== JSON.stringify(home.bodySections || []);
  return { changed, patch, sections };
}

function upgradeFeatureCardDefaults(cards = [], seedCards = []) {
  if (!Array.isArray(cards)) return cards;
  return cards.map((card, index) => {
    const seedCard = seedCards[index];
    if (!seedCard) return card;
    if (index === 0 && card?.title === "Choose the Right Study Destination" && card?.eyebrow === "Bangladeshi Students") {
      return { ...card, ...seedCard };
    }
    if (index === 1 && ["How Abroadways Guides You", "How Abroadways Guides You Step by Step"].includes(card?.title)) {
      return { ...card, ...seedCard };
    }
    return card;
  });
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
  const data = JSON.parse(raw);
  const backfilled = backfillLocalDefaults(data);
  if (backfilled.changed) {
    await writeLocal(backfilled.data);
    return backfilled.data;
  }
  return data;
}

async function writeLocal(data) {
  await mkdir(dirname(localPath), { recursive: true });
  await writeFile(localPath, JSON.stringify(data, null, 2));
}

function backfillLocalDefaults(data) {
  let changed = false;
  const next = { ...data };
  next.pages = Array.isArray(next.pages) ? [...next.pages] : [];
  for (const seedPage of seedData.pages) {
    const exists = next.pages.some((page) => page.id === seedPage.id || page.routeKey === seedPage.routeKey || page.slug === seedPage.slug);
    if (!exists) {
      next.pages.push(stampSeed(seedPage));
      changed = true;
    }
  }
  const seedHome = seedData.pages.find((page) => page.routeKey === "home");
  const homeIndex = next.pages.findIndex((page) => page.routeKey === "home" || page.slug === "/" || page.id === "home");
  if (seedHome && homeIndex >= 0) {
    const home = next.pages[homeIndex];
    const currentSections = Array.isArray(home.bodySections) ? home.bodySections : [];
    const currentKeys = new Set(currentSections.map((section) => section?.type || section?.key).filter(Boolean));
    const missing = seedHome.bodySections.filter((section) => !currentKeys.has(section.type) && !currentKeys.has(section.key));
    const upgradedHome = upgradeHomeDefaults(home, seedHome);
    if (missing.length || upgradedHome.changed) {
      const lastOrder = currentSections.reduce((max, section) => Math.max(max, Number(section?.order || 0)), 0);
      const additions = missing.map((section, index) => ({ ...section, order: homeSectionBackfillOrder(section, lastOrder + index + 1) }));
      next.pages[homeIndex] = { ...home, ...upgradedHome.patch, bodySections: [...upgradedHome.sections, ...additions], updatedAt: new Date().toISOString() };
      changed = true;
    }
  }
  next.settings = Array.isArray(next.settings) ? [...next.settings] : [];
  const seedSettings = seedData.settings[0];
  if (seedSettings) {
    if (!next.settings.length) {
      next.settings.push(stampSeed(seedSettings));
      changed = true;
    } else {
      const patch = settingsDefaultsPatch(next.settings[0], seedSettings);
      if (Object.keys(patch).length) {
        next.settings[0] = { ...next.settings[0], ...patch, updatedAt: new Date().toISOString() };
        changed = true;
      }
    }
  }
  next.countries = Array.isArray(next.countries) ? [...next.countries] : [];
  for (const seedCountry of seedData.countries || []) {
    const index = next.countries.findIndex((country) => country.slug === seedCountry.slug || country.id === seedCountry.id);
    if (index === -1) {
      next.countries.push(stampSeed(seedCountry));
      changed = true;
      continue;
    }
    const patch = missingDefaultsPatch(next.countries[index], seedCountry, [
      "heroCtaText",
      "heroCtaLink",
      "heroImages",
      "heroMainImageUrl",
      "heroSideImageUrl1",
      "heroSideImageUrl2",
      "displayOrder",
      "sectionsNav",
      "overviewSection",
      "countryFacts",
      "factsAndFiguresTable",
      "whyStudy",
      "educationSystem",
      "topUniversitiesTable",
      "topCollegesTable",
      "topSubjects",
      "tuitionAndCost",
      "scholarshipsSection",
      "postStudyPathways",
      "finalCta",
      "averageTuitionMin",
      "averageTuitionMax",
      "livingCostMin",
      "livingCostMax",
      "currency",
      "languageRequirement",
      "scholarshipNote",
      "postStudyNote",
      "workWhileStudyingNote",
      "bestFor",
      "popularSubjects",
      "applicationTimeline",
    ]);
    if (Object.keys(patch).length) {
      next.countries[index] = { ...next.countries[index], ...patch, updatedAt: new Date().toISOString() };
      changed = true;
    }
  }
  for (const collection of ["universities", "courses", "scholarships"]) {
    next[collection] = Array.isArray(next[collection]) ? [...next[collection]] : [];
    for (const seedItem of seedData[collection] || []) {
      const exists = next[collection].some((item) => item.id === seedItem.id || item.slug === seedItem.slug);
      if (!exists) {
        next[collection].push(stampSeed(seedItem));
        changed = true;
      }
    }
  }
  return { changed, data: next };
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
  delete updatePatch._id;
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
