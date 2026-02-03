# 🎬 Betsson Movies App
A full-stack movie browsing application built with Next.js, Express, MongoDB, and Docker.



## 🚀 Getting Started
Build the app with Docker

### Start Containers
```docker compose up -d --build```

```-d``` Run in detached mode (background).

```--build```  Rebuild images before starting (ensures code changes are applied).

### Stop Containers
```docker compose down -v```

```-v``` Removes named volumes (wipes the MongoDB data for a clean slate).

### View Logs
```docker compose logs -f [service_name]```

```-f``` Stream/follow the logs in real-time.

- *Example: ```docker compose logs -f backend```*



## 🛠 Database & Backend

### Seed Database
The database seeds automatically on startup, but you can manually trigger it:

```docker compose exec backend npm run seed```

### Swagger Documentation
Explore the API endpoints and schemas: 🔗 http://localhost:5000/api/docs



## 🧪 Testing
These tests verify the full integration from the UI to the Database. Ensure the containers are running before starting.

### Frontend Tests (Playwright)
Run tests with the UI Dashboard (Recommended for debugging)

```cd .\frontend\``` and ```npm run test```

### Backend Tests (Jest + Supertest)

```docker compose exec backend npm run test```
