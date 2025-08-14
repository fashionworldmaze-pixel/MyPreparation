# PrepBoss (Zoho SDE Prep App)

A minimal, bold productivity PWA to prepare for your Zoho SDE interview in 2 months. Stack: React (Vite) + Tailwind, Node/Express, MongoDB Atlas. Single-user password login, reminders, streaks, subject progress, focus mode, and motivational board.

## Monorepo structure
- `frontend` – Vite React + Tailwind + PWA
- `backend` – Express API + MongoDB

## Prerequisites
- Node.js 18+
- MongoDB Atlas connection string

## Setup
1) Backend env
```
cp backend/.env.example backend/.env
# edit backend/.env
MONGO_URI=your_mongodb_atlas_uri
APP_PASSWORD=your_password
JWT_SECRET=your_random_secret
PORT=5000
```

2) Frontend env
```
cp frontend/.env.example frontend/.env
# edit if backend runs elsewhere
VITE_API_URL=http://localhost:5000
```

3) Install deps
```
(cd backend && npm i)
(cd frontend && npm i)
```

4) Seed sample data
```
(cd backend && node seed/seed.js)
```

5) Run dev
```
(cd backend && npm run dev)
(cd frontend && npm run dev)
```
Open the frontend URL shown by Vite. Login with the password from `APP_PASSWORD`.

## Deploy
- Backend: Render/Heroku
  - Set env vars from `backend/.env.example`
  - Start command: `npm start`
- Frontend: Netlify
  - Build: `npm run build`
  - Publish: `dist`
  - Env: `VITE_API_URL` -> your backend URL

## Notes
- PWA: Install on mobile; notifications work while the app is open (Web Notifications API). For background push, add a push service later.
- Icons: Replace placeholder icons in `frontend/public` with real PNGs.