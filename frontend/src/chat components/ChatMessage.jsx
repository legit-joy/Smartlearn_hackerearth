import { Bot, User } from 'lucide-react'
import React from 'react'

const ChatMessage = ({message, darkmode, formatTime}) => {
  return (
    <div className={`flex ${message.sender === "user"? "justify-end": "justify-start"}`}>
      <div className={`flex max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3.5 ${
        message.sender === "user"
        ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md"
        : darkmode ? "bg-gray-800 text-gray-100 border border-gray-700" : "bg-white text-gray-800 shadow-md"
        }`}>
        
        <div className={`flex-shrink-0 mr-3 ${message.sender === "user"
            ? "text-white" : darkmode ? "text-gray-100" : "text-gray-800"
        }`}>
            {message.sender === "user" ? <User className='h-5 w-5' /> : <Bot className='h-5 w-5' />}
        </div>
        <div className='flex-1'>
            <div className='md-1 flex justify-between items-center'>
                <span className="text-sm font-medium">{message.sender === "user" ? "You" : "AI Assistant"}</span>
                <span className={`text-xs ${message.sender === "user"
                    ? "text-white/80" : darkmode ? "text-gray-300" : "text-gray-500"} ml-3`}>
                        {formatTime(message.timestamp)}
                </span>
            </div>
            <p className='text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed'>{message.text}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
