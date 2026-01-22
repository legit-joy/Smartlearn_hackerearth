import React from 'react'
import {Bot, Moon, Sparkles, Sun} from 'lucide-react'

const Header = ({darkmode, toggleDarkMode}) => {
  return (
    <header className={`${darkmode ? "bg-gray-800 text-white" : "bg-white"} shadow-lg py-4 px-6 border-b ${darkmode ? "border-gray-700" : "border-gray-200"}`}>
      <div className='flex items-center justify-between max-w-5xl mx-auto'>
        <div className='flex items-center space-x-3'>
          <div className='p-2 bg-orange-500 rounded-full'>
            <Bot className='h-8 w-8 text-white' />
          </div>
          <h1 className='text-xl font-bold'>Intelligent Chat</h1>
        </div>

        <div className='flex items-center space-x-3'>
          <div className='flex items-center px-3 py-1 rounded text-sm font-medium space-x-1.5'>
            <Sparkles />
            <span className={`${darkmode ? "text-white" : "text-black"} text-sm font-medium`}>AI Powered</span>
          </div>
          <button className={`p-2 rounded-full cursor-pointer ${darkmode ? "hover:bg-gray-700" : ""}`} onClick={toggleDarkMode}>
            {darkmode ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
