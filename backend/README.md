# ETHREE Backend

Production-ready Node.js/Express backend for the ETHREE app.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT
- **Documentation:** Swagger (OpenAPI)
- **Deployment:** Vercel

## Setup

1. **Install Dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables:**
   Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT Secret.

3. **Run Locally:**
   ```bash
   npm run dev
   ```
   API will be available at `http://localhost:5001`

4. **API Documentation:**
   Open `http://localhost:5001/api-docs` in your browser.

5. **Seed Data:**
   ```bash
   npm run seed
   ```

## Deployment (Vercel)

1. Connect your repository to Vercel.
2. Set the root directory to `backend`.
3. Add environment variables (`MONGODB_URI`, `JWT_SECRET`) in Vercel Dashboard.
4. Deploy!
