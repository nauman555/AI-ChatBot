# AI Chatbot

A simple and modern AI chatbot application built with React and Express.js.

## What is This?

This is a chatbot web application where you can:

- Chat with an AI assistant in real-time
- Get instant responses to your questions
- Enjoy a clean and modern user interface
- Use it on any computer with a web browser

## How to Set Up

### Step 1: Download the Project

```bash
# Copy the project to your computer
git clone https://github.com/nauman555/AI-ChatBot.git

# Go into the project folder
cd AI-CHATBOT
```

### Step 2: Set Up the Frontend

```bash
# Install all required packages
npm install

# Create a new file called .env.local
# Add this line to the file:
# VITE_API_URL=http://localhost:5000/api
```

### Step 3: Get API Keys

You need two API keys to make the AI work:

**Get Groq API Key:**

1. Go to https://console.groq.com/keys
2. Sign up or log in
3. Copy your API key

**Get Tavily API Key (for web search):**

1. Go to https://tavily.com
2. Sign up or log in
3. Copy your API key

### Step 4: Set Up the Backend

```bash
# Go into the server folder
cd server

# Install all required packages
npm install

# Create a new file called .env
# Add these lines to the file:
# PORT=5000
# GROQ_API_KEY=your_groq_api_key_here
# TVLY_API_KEY=your_tavily_api_key_here
```

## How to Run

You need to start **two different applications** at the same time.

### Terminal 1 - Start the Frontend (React)

```bash
# Make sure you're in the main project folder
# If you're in the server folder, go back:
cd ..

# Start the frontend
npm run dev

# You'll see something like:
# ➜ Local: http://localhost:5173/
```

### Terminal 2 - Start the Backend (Express Server)

```bash
# Go into the server folder
cd server

# Start the backend
npm run dev

# You'll see something like:
# Server is running on port 5000
```

Now open your browser and go to: **http://localhost:5173/**

That's it! You can now chat with the AI. 🎉

## How It Works

1. **You type a message** → Click "Ask" or press Enter
2. **Frontend sends to backend** → Message goes to http://localhost:5000/api/ai/chat with a unique **Thread ID**
3. **Backend stores messages** → Uses **Node Cache** to store conversation history for each thread
4. **Backend processes it** → Uses **Groq AI (LLama 3.3 70B model)** to understand your question
5. **Tool Calling with Tavily** → Groq decides if it needs more information and calls **Tavily API** for web search
6. **Tavily searches the web** → Gets real-time information from the internet
7. **AI generates response** → Combines its knowledge with latest web search results
8. **Chat history saved** → All messages are saved in cache for your thread ID
9. **Response comes back** → Displayed in the chat
10. **You see the answer** → On your screen

### What is Groq?

**Groq** is a fast and powerful AI language model that can:

- Understand complex questions
- Provide detailed answers
- Decide when to search the web for information (tool calling)

### What is Tavily (Tool Calling)?

**Tavily** is a tool that Groq AI can call to:

- Search the internet for real-time information
- Provide up-to-date answers
- Act as a "tool" that AI uses when needed
- Help AI answer questions that need current information

### What is Thread ID and Chat History?

**Thread ID** is a unique identifier for each chat session:

- **Unique Per Chat Session** - Each time you open the app, a new Thread ID is created
- **Thread ID changes only on page reload** - The same Thread ID is used for all messages in one chat session
- **Conversation History** - All your messages and AI responses are stored together using the Thread ID
- **Node Cache** - The backend uses Node Cache to store conversation history for 24 hours per thread
- **Maintains Context** - The AI remembers previous messages in the same thread for better context
- **Multiple Threads** - Each browser tab/window has its own separate conversation history

## Folder Structure

```
AI-CHATBOT/
├── src/                      # React Frontend
│   ├── App.jsx              # Main chat interface
│   ├── Components/          # Reusable UI components
│   ├── index.css            # Styling
│   └── main.jsx             # Entry point
├── server/                  # Express Backend
│   ├── server.js            # Main server file
│   ├── routes/              # API endpoints
│   ├── controllers/         # Business logic
│   ├── middleware/          # Helper functions
│   ├── package.json         # Server dependencies
│   └── .env                 # Server configuration
├── package.json             # Frontend dependencies
├── vite.config.js           # Frontend build settings
└── .gitignore              # Files to ignore
```

## File Explanations

### Frontend (`src/App.jsx`)

- Shows the chat interface
- Sends messages to the back when you click "Ask"
- Displays responses from the AI

### Backend (`server/server.js`)

- Receives messages from the frontend
- Forwards to AI service
- Sends response back to frontend

### Routes (`server/routes/aiRoutes.js`)

- Defines API endpoints
- `/api/ai/chat` - Send a message to the AI (with thread ID for history)
- `/api/ai/history` - Get chat history for a specific thread

### Controllers

- Contains the logic to call the AI service
- Processes the response
- Sends it back to frontend

## API Endpoints

### Send a Chat Message

**Endpoint:** `POST /api/ai/chat`

**Request:**
```json
{
  "thread_id": "abc1234567",
  "message": "What is the capital of France?"
}
```

**Response:**
```json
{
  "reply": "The capital of France is Paris."
}
```

**How it works:**
- The same `thread_id` is sent with every message
- Backend retrieves previous messages from cache for that thread
- AI understands the conversation context
- New message and response are added to the cache

### Get Chat History

**Endpoint:** `GET /api/ai/history?thread_id=abc1234567`

**Response:**
```json
[
  { "role": "user", "content": "What is the capital of France?" },
  { "role": "assistant", "content": "The capital of France is Paris." }
]
```

**Note:** Chat history is stored for **24 hours** per thread, then automatically deleted.

## Technology Used

- **React** - Frontend framework (shows the chat)
- **Express.js** - Backend server (handles requests)
- **Vite** - Fast frontend build tool
- **Tailwind CSS** - Styling framework (makes it look nice)
- **Node.js** - JavaScript runtime
- **Groq AI** - Powerful language model for intelligent responses
- **Tavily API** - Tool calling service (web search for latest information)
- **Node Cache** - In-memory cache to store conversation history per thread for 24 hours
- **dotenv** - Manages secret keys safely

## Deploy to Internet

When you're ready to share with others:

1. **Deploy Backend** - Use Heroku, Railway, or Render
2. **Deploy Frontend** - Use Vercel, Netlify, or Cloudflare Pages
3. **Update URLs** - Change `VITE_API_URL` to your deployed backend URL
