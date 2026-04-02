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
git clone <repo-url>

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

⚠️ **Important:** Never share your API keys! Keep them private!

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
2. **Frontend sends to backend** → Message goes to http://localhost:5000/api/ai/chat
3. **Backend processes it** → Uses **Groq AI (LLama 3.3 70B model)** to understand your question
4. **Tool Calling with Tavily** → Groq decides if it needs more information and calls **Tavily API** for web search
5. **Tavily searches the web** → Gets real-time information from the internet
6. **AI generates response** → Combines its knowledge with latest web search results
7. **Response comes back** → Displayed in the chat
8. **You see the answer** → On your screen

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
- `/api/ai/chat` - Send a message to the AI

### Controllers

- Contains the logic to call the AI service
- Processes the response
- Sends it back to frontend

## Technology Used

- **React** - Frontend framework (shows the chat)
- **Express.js** - Backend server (handles requests)
- **Vite** - Fast frontend build tool
- **Tailwind CSS** - Styling framework (makes it look nice)
- **Node.js** - JavaScript runtime
- **Groq AI** - Powerful language model for intelligent responses
- **Tavily API** - Tool calling service (web search for latest information)
- **dotenv** - Manages secret keys safely

## Deploy to Internet

When you're ready to share with others:

1. **Deploy Backend** - Use Heroku, Railway, or Render
2. **Deploy Frontend** - Use Vercel, Netlify, or Cloudflare Pages
3. **Update URLs** - Change `VITE_API_URL` to your deployed backend URL
