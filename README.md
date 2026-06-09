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
ADMIN_EMAIL=admin@abroadways.com.bd
ADMIN_PASSWORD=Abroadways@12345
ADMIN_SESSION_SECRET=change-this-local-secret
```

Create a `.env` file in the project root with those variables for local development. Do not print or commit production passwords.

To change admin credentials later, update `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` locally and in your deployment environment variables. Use a long random value for `ADMIN_SESSION_SECRET` in production.

It uses a local JSON store for development at `data/cms-db.json`. For MongoDB Atlas Data API, set:

```bash
MONGODB_DATA_API_URL=
MONGODB_DATA_API_KEY=
MONGODB_DATA_SOURCE=
MONGODB_DATABASE=
```

## Deployment

The frontend build is Vercel-ready through `vercel.json`. The full-stack Node server can be deployed to Render or another Node host with `node server/index.mjs`.
