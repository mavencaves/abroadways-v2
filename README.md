# Abroadways V2 Pro

Premium full-stack study abroad agency website and CMS for Abroadways Limited, focused only on:

- New Zealand
- United Kingdom
- Australia
- Canada
- Malaysia

## Local Commands

```bash
node scripts/build.mjs
node server/index.mjs
```

If `npm` is available in your environment, these package scripts call the same commands:

```bash
npm run dev
npm run build
npm run preview
```

## Backend

The backend is a Node REST API with CMS collections for public pages, countries, blogs, leads, media, and settings.

Admin CMS access requires:

```bash
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

It uses a local JSON store for development at `data/cms-db.json`. For MongoDB Atlas Data API, set:

```bash
MONGODB_DATA_API_URL=
MONGODB_DATA_API_KEY=
MONGODB_DATA_SOURCE=
MONGODB_DATABASE=
```

## Deployment

The frontend build is Vercel-ready through `vercel.json`. The full-stack Node server can be deployed to Render or another Node host with `node server/index.mjs`.
