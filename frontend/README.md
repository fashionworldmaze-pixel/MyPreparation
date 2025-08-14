# PrepBoss Frontend

## Setup

1. Create `.env` from `.env.example`:
```
VITE_API_URL=http://localhost:5000
```

2. Install deps and run:
```
npm install
npm run dev
```

## PWA & Notifications
- The app is PWA-enabled via `vite-plugin-pwa`.
- On first load, the service worker registers. You can install to mobile home screen.
- For reminders, allow notifications in the browser. Future enhancements can schedule notifications via the Notifications API and `setTimeout` while the app is open.

## Deploy
- Deploy to Netlify: set build command `npm run build` and publish directory `dist`.
- Set env var `VITE_API_URL` to point to your deployed backend.
