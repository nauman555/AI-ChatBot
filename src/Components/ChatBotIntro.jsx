import React from "react";

function ChatBotIntro({ showintro }) {
  return (
    <div id="intro Div">
      {showintro && (
        <div className="flex flex-1 items-center justify-center">
          <div className="bg-gray-800 px-6 py-4 rounded-xl max-w-2xl text-white text-2xl font-semibold text-center">
            Hello! How can I help you?
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBotIntro;
