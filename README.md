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

The CMS uses the official MongoDB Node driver when `MONGODB_URI` is configured. The database name is `abroadways_v2`, with collections for `pages`, `countries`, `blogs`, `leads`, `media`, and `settings`.

```bash
MONGODB_URI=your-mongodb-connection-string
```

When `MONGODB_URI` is missing, the backend falls back to the local JSON development store at `data/cms-db.json`.

On first MongoDB startup, the backend creates the CMS collections and seeds the homepage, the five Abroadways country pages, and site settings.

Media uploads use Cloudinary when these environment variables are configured:

```bash
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

Do not commit real Cloudinary secrets. Add them to `.env` locally and to Render environment variables for production.

## Deployment

The frontend build is Vercel-ready through `vercel.json`. The full-stack Node server can be deployed to Render or another Node host with `node server/index.mjs`.

If Vercel serves the public frontend and Render serves the API, set this during the Vercel build so browser requests go to Render:

```bash
ABROADWAYS_API_BASE=https://your-render-service.onrender.com
```

Leave `ABROADWAYS_API_BASE` blank when the frontend and backend are served from the same origin.
