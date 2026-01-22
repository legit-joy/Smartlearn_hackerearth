import { Send, Mic } from 'lucide-react'
import React from 'react'

const ChatInput = ({ darkmode, input, setInput, isLoading, handleSendMessage, onMicClick }) => {
  return (
    <div
      className={`${
        darkmode
          ? "bg-gray-800 border-t border-gray-700"
          : "bg-white border-t border-gray-200"
      } p-4`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e)=> {
                if(e.key === "Enter" && !e.shiftKey){
                    e.preventDefault();
                    handleSendMessage();
                }
            }}
            placeholder="type your message"
            className={`flex-1 border ${
              darkmode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            } rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
          />
          <button className={`p-3 rounded-full transition-colors shadow-md cursor-pointer`} 
            onClick={handleSendMessage}
            disabled={isLoading || input.trim() === ""}>
            <Send className={`${darkmode ? "text-white" : "text-gray-800"}`} />
          </button>
          <button
            type="button"
            onClick={onMicClick}
            className={`p-3 rounded-full transition-colors shadow-md cursor-pointer ${
              darkmode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            <Mic className={`${darkmode ? "text-white" : "text-gray-800"}`} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
