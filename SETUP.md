# CyberCafe Setup Guide

This guide will help you set up both the client and server for the CyberCafe application.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Server Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `env.example`):
```bash
# On Windows PowerShell
Copy-Item env.example .env

# On Linux/Mac
cp env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/cybercafe
CLIENT_URL=http://localhost:3000
```

   For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cybercafe?retryWrites=true&w=majority
```

5. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## Client Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (copy from `env.example`):
```bash
# On Windows PowerShell
Copy-Item env.example .env.local

# On Linux/Mac
cp env.example .env.local
```

4. Update `.env.local` with the API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:3000`

## Testing the Setup

1. Make sure both server and client are running
2. Navigate to `http://localhost:3000/contact`
3. Fill out the contact form and submit
4. Check the server console for the lead creation log
5. Verify the lead was saved in MongoDB

## Project Structure

```
cybercafe/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── pages/
│   │   │   └── contact.tsx  # Contact page with form
│   │   └── ...
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   └── package.json
└── SETUP.md
```

## API Endpoints

### Health Check
- `GET http://localhost:5000/api/health`

### Leads
- `POST http://localhost:5000/api/leads` - Create a new lead
- `GET http://localhost:5000/api/leads` - Get all leads
- `GET http://localhost:5000/api/leads/:id` - Get a specific lead

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Verify your MongoDB Atlas connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas (if using Atlas)

### CORS Errors
- Make sure `CLIENT_URL` in server `.env` matches your client URL
- Default is `http://localhost:3000`

### Port Already in Use
- Change the `PORT` in server `.env` if 5000 is already in use
- Update `NEXT_PUBLIC_API_URL` in client `.env.local` accordingly

## Production Deployment

1. Build the server:
```bash
cd server
npm run build
```

2. Build the client:
```bash
cd client
npm run build
```

3. Set production environment variables
4. Start the server:
```bash
cd server
npm start
```

5. Start the client:
```bash
cd client
npm start
```

