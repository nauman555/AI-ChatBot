import React from "react";
import { useState, useRef } from "react";
import ChatBotIntro from "./Components/chatBotIntro";
import AIresponseC from "./Components/AIresponseC";
import InputTextAreaC from "./Components/InputTextAreaC";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function App() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isThinking, setIsThinking] = useState(false);

  const textareaRef = useRef(null);

  const autoResize = (el) => {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };
  const reSizeTextArea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "60px";
    }
  };

  /// Handle Enter key press to send message
  const onEnterfetchUserInput = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onClickfetchUserInput();
    }
  };

  // Handle Ask button click
  const onClickfetchUserInput = async () => {
    if (!userInput.trim()) return; // Prevent sending empty messages

    const userMsg = {
      role: "user",
      text: userInput,
    };
    setMessages((prevMessages) => [...prevMessages, userMsg]);
    setUserInput(""); // Clear the textarea
    reSizeTextArea();
    setLoading(true);
    setShowIntro(false);
    setIsThinking(true);

    //call backend API to get AI response

    const AiCallResponse = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });
    if (AiCallResponse.ok) {
      const data = await AiCallResponse.json();
      const aiMsg = {
        role: "ai",
        text: data.aiResponse,
      };
      setMessages((prevMessages) => [...prevMessages, aiMsg]);
      setLoading(false);
      setIsThinking(false);
    }
  };

  return (
    ////
    //  Main container
    <div className="flex flex-col h-screen ">
      <div
        id="chatContainer"
        className="flex-1 overflow-y-auto px-4 py-6 overflow-y-scrollbar-hide"
      >
        <div className="max-w-4xl mx-auto w-full space-y-4">
          <ChatBotIntro showintro={showIntro} />

          <AIresponseC messages={messages} isThinking={isThinking} />
        </div>
      </div>

      {/* //textarea and send button container */}
      <InputTextAreaC
        userInput={userInput}
        setUserInput={setUserInput}
        loading={loading}
        textareaRef={textareaRef}
        onEnterfetchUserInput={onEnterfetchUserInput}
        onClickfetchUserInput={onClickfetchUserInput}
        autoResize={autoResize}
      />
    </div>
  );
}

export default App;
