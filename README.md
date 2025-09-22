# MERN DevOps Practice App

A simple MERN stack application for practicing DevOps with TypeScript.

## Features

- ✅ Express.js Backend with TypeScript
- ✅ React Frontend with TypeScript  
- ✅ CORS Configuration
- ✅ Health Check Endpoint
- ✅ Simple API Communication

## Quick Start

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/test` - Simple test endpoint

## Project Structure

```
devops-mern/
├── backend/
│   ├── src/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   ├── index.tsx
    │   └── index.css
    ├── public/
    ├── package.json
    └── tsconfig.json
```

## Next Steps for DevOps

This simple app is ready for:
- Docker containerization
- CI/CD pipeline setup
- Environment configuration
- Monitoring and logging
- Database integration
- Testing frameworks
