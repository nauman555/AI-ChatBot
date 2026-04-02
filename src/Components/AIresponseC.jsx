import React from "react";

function AIresponseC({ messages }) {
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
            className={`px-4 py-3 rounded-xl max-w-2xl break-words ${
              msg.role === "user" ? "bg-gray-500" : "bg-gray-800"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AIresponseC;
