import React from "react";

const InputTextAreaC = ({
  userInput,
  setUserInput,
  loading,
  textareaRef,
  onEnterfetchUserInput,
  onClickfetchUserInput,
  autoResize,
}) => {
  return (
    <div className="p-4 bg-gray-900">
      <div className="max-w-4xl mx-auto relative">
        <textarea
          placeholder="Ask AI anything ...."
          value={userInput}
          disabled={loading}
          ref={textareaRef}
          rows={1}
          className="w-full min-h-[60px] max-h-[300px] resize-none overflow-y-auto scrollbar-hide pr-20 bg-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none transition-all duration-200 ease-in-out"
          onKeyDown={(e) => {
            onEnterfetchUserInput(e);
          }}
          onChange={(e) => {
            autoResize(e.target);
            setUserInput(e.target.value);
          }}
        ></textarea>
        <button
          onClick={() => {
            onClickfetchUserInput();
          }}
          disabled={loading}
          className="absolute right-3 bottom-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </div>
    </div>
  );
};

export default InputTextAreaC;
