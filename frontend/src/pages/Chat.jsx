import React from 'react'
import { useState } from 'react';
import Header from '../chat components/Header'
import ChatMessage from '../chat components/ChatMessage'
import ChatInput from '../chat components/ChatInput';
import { getRandomResponse, formatTime } from '../utils/chatUtils';
import LoadingIndicator from '../chat components/LoadingIndicator';
import {generateContent} from "../Services/geminiApi";

const Chat = () => {

const [darkmode, setDarkmode]= useState(false);
const [isLoading, setIsLoading]= useState(false);
const [input, setInput]= useState('');
const [messages, setMessages]= useState([]);
const [openVoice, setOpenVoice] = useState(false);

const toggleDarkMode= ()=>{
  setDarkmode(!darkmode);
}

const handleSendMessage = async () => {
  const userMessage = {
    id: Date.now().toString(),
    text: input,
    sender: "user",
    timestamp: new Date(),
  };
  

  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setIsLoading(true);

  try {
    // Small UX delay to keep the typing indicator visible
    await new Promise((resolve) => setTimeout(resolve, 600));
    const text = await generateContent(userMessage.text);
    const botMessage = {
      id: (Date.now() + 1).toString(),
      text,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
  } catch (e) {
    const botMessage = {
      id: (Date.now() + 1).toString(),
      text: "Please try again in a moment.",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  } finally {
    setIsLoading(false);
  }
};

const handleSuggestionClick = (suggestion) => {
  setInput(suggestion);
};

  const showSuggestions = !messages.some(msg => msg.sender === "user");
  const suggestions = [
    "How can I use journaling to help students reflect on their learning?",
    "How can I get parents involved more in the classroom?",
    "How can I find local professionals to speak to students?"
  ];

  return (
    <div className='flex flex-col h-screen'>
      <Header darkmode={darkmode} toggleDarkMode={toggleDarkMode} />
      <div className='flex-1 overflow-y-auto p-4 md:p-6'>
        <div className='max-w-5xl mx-auto space-y-4'>
          {messages.map((message) => {
            return (
            <ChatMessage key={message.id} message={message} darkmode={darkmode} formatTime={formatTime} />
          )})}
          {isLoading && <LoadingIndicator darkmode={darkmode} />}
          
          {/* Suggestions Section */}
          {showSuggestions && (
            <div className='mt-8 mb-4'>
              <div className='flex flex-col items-center mb-6'>
                <div className='w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-3 relative'>
                  {/* Two overlapping speech bubbles */}
                  <svg className='w-6 h-6 text-white absolute' style={{ left: '6px', top: '6px' }} fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z' />
                  </svg>
                  <svg className='w-5 h-5 text-white absolute' style={{ right: '4px', bottom: '4px' }} fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z' />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                  How can we help?
                </h3>
              </div>
              
              <div className='space-y-3'>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`${
                      darkmode
                        ? 'bg-gray-800 hover:bg-gray-700 border-gray-700'
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                    } border rounded-lg p-4 cursor-pointer transition-all duration-200 flex items-center justify-between shadow-sm hover:shadow-md`}
                  >
                    <div className='flex items-center gap-4 flex-1'>
                      <div className='w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0'>
                        <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                        </svg>
                      </div>
                      <p className={`${darkmode ? 'text-gray-200' : 'text-gray-700'} font-medium`}>
                        {suggestion}
                      </p>
                    </div>
                    <span className={`${darkmode ? 'text-gray-400' : 'text-gray-600'} font-medium ml-4`}>
                      Get started &gt;
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <ChatInput darkmode={darkmode} input={input} setInput={setInput} isLoading={isLoading} handleSendMessage={handleSendMessage} onMicClick={() => setOpenVoice(true)} />
      {openVoice && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[90%] h-[85%] rounded-xl relative">
            
            <button
              onClick={() => setOpenVoice(false)}
              className="absolute top-4 right-4 z-[9999]
              w-10 h-10 flex items-center justify-center
              rounded-full bg-black/70 text-white
              hover:bg-black transition"
            >
            ✕
            </button>

            <iframe
              src="http://localhost:3000"
              className="w-full h-full rounded-xl"
              allow="microphone; camera; autoplay; clipboard-read; clipboard-write"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat