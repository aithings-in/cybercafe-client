# CyberCafe Server

Backend server for CyberCafe application built with Express, TypeScript, and MongoDB.

## Features

- RESTful API for managing leads
- MongoDB database integration
- MVC architecture
- Input validation
- Error handling middleware
- CORS support

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/
│   │   └── leadController.ts    # Lead business logic
│   ├── models/
│   │   └── Lead.ts              # Lead Mongoose model
│   ├── routes/
│   │   └── leadRoutes.ts        # Lead API routes
│   ├── middleware/
│   │   └── errorHandler.ts      # Error handling middleware
│   └── index.ts                 # Express app entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/cybercafe
CLIENT_URL=http://localhost:3000
```

3. Make sure MongoDB is running on your system, or use MongoDB Atlas connection string.

4. Run the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Leads
- `POST /api/leads` - Create a new lead
- `GET /api/leads` - Get all leads
- `GET /api/leads/:id` - Get a specific lead by ID

### Create Lead Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "subject": "Inquiry",
  "message": "I would like to know more about your services."
}
```

### Create Lead Response
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "subject": "Inquiry",
    "message": "I would like to know more about your services.",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `CLIENT_URL` - Frontend URL for CORS configuration

