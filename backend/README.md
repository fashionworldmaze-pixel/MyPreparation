# PrepBoss Backend

## Setup

1. Create `.env` from `.env.example` with your values:
```
MONGO_URI=your_mongodb_atlas_uri
APP_PASSWORD=your_strong_password
JWT_SECRET=generate_a_random_secret
PORT=5000
```

2. Install deps:
```
npm install
```

3. Seed sample data:
```
node seed/seed.js
```

4. Run dev server:
```
npm run dev
```

## Deploy
- Use Render/Heroku. Set env vars from above.
- Start command: `npm start`
- Ensure CORS allows your frontend domain.