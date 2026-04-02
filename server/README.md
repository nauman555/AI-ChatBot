# AI Chatbot Server

Node.js Express backend server for AI Chatbot application.

## Folder Structure

```
server/
├── config/           # Configuration files (database, environment)
├── controllers/      # Business logic for handling requests
├── middleware/       # Custom middleware (error handling, authentication, etc.)
├── models/           # MongoDB schemas and models
├── routes/           # API routes
├── .env              # Environment variables
├── package.json      # Server dependencies
└── server.js         # Main server file
```

## Setup

1. Install dependencies:

   ```bash
   cd server
   npm install
   ```

2. Create `.env` file with your configuration (already created)

3. Start the server:
   ```bash
   npm run dev    # Development mode with nodemon
   npm start      # Production mode
   ```

## API Endpoints

- `POST /api/ai/chat` - Send message and get AI response
