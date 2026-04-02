import React from "react";

function AIresponseC({ messages, isThinking, chatEndRef }) {
  return (
    <div id="messages Div">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-3 my-3 rounded-xl max-w-2xl break-words ${
              msg.role === "user" ? "bg-gray-500" : "bg-gray-800"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
      {isThinking && (
        <div className="flex justify-start">
          <div className="px-4 py-3 rounded-xl max-w-2xl bg-gray-800 text-gray-300 italic animate-pulse">
            Thinking<span className="animate-pulse">...</span>
          </div>
        </div>
      )}
      <div ref={chatEndRef}></div>
    </div>
  );
}

export default AIresponseC;
