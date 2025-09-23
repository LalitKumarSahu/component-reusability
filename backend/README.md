## Backend (Node + Express)

Steps to run:
1. cd backend
2. npm install
3. npm run dev    # requires nodemon or use `npm start`

API endpoints:
- GET /            -> health check
- GET /api/components/:device  -> returns components for device (e.g. /api/components/Mobile)
- GET /api/recycling-centers   -> returns dummy recycling centers
