import React, { useState } from 'react';
import { generateContent } from '../Services/geminiApi';
import LoadingIndicator from '../chat components/LoadingIndicator';

const Tools = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  const handleToolClick = (toolName) => {
    setActiveTool(toolName);
    setInput('');
    setResponse('');
  };

  const handleClose = () => {
    setActiveTool(null);
    setInput('');
    setResponse('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setResponse('');

    try {
      let prompt = '';
      if (activeTool === 'concept-explainer') {
        prompt = `Explain the following concept in detail: ${input}`;
      } else if (activeTool === 'mini-saga') {
        prompt = `Write a mini saga (a very short story) in approximately 150 words about: ${input}`;
      }

      const text = await generateContent(prompt);
      setResponse(text);
    } catch (error) {
      setResponse('Sorry, there was an error generating the response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#E0F7FA] via-white to-[#F3E5F5] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Browse our powerful AI tools below
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Select a tool to get started
        </p>

        <div className="flex justify-center gap-6 flex-wrap mt-8">
          {/* Concept Explainer Card */}
          <div
            onClick={() => handleToolClick('concept-explainer')}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 w-full sm:w-[320px] p-6 border border-gray-100"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Concept Explainer
            </h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              Get detailed explanations of any concept you want to understand
            </p>
          </div>

          {/* Mini Saga Card */}
          <div
            onClick={() => handleToolClick('mini-saga')}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 w-full sm:w-[320px] p-6 border border-gray-100"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Mini Saga
            </h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              Create a short story (around 150 words) based on your input
            </p>
          </div>

        {/* ExplainAI Card */}
        <div
          onClick={() => handleToolClick('explain-ai')}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 w-full sm:w-[320px] p-6 border border-gray-100"
        >
          <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
           ExplainAI
        </h3>
        <p className="text-gray-600 text-center text-sm leading-relaxed">
          Interactive AI explanation experience
        </p>
        </div>
        </div>

        {/* Modal/Box for Tool Interaction */}
        {activeTool && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden">
      <div className="p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeTool === 'concept-explainer'
              ? 'Concept Explainer'
              : activeTool === 'mini-saga'
              ? 'Mini Saga'
              : 'ExplainAI'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* ===== ExplainAI iframe ===== */}
        {activeTool === 'explain-ai' && (
          <div className="w-full h-[70vh] rounded-lg overflow-hidden border">
            <iframe
              src="http://localhost:3000"
              title="ExplainAI"
              className="w-full h-full border-none"
              allow="microphone; camera; clipboard-read; clipboard-write"
            />
          </div>
        )}

        {/* ===== Gemini tools (Concept + Mini Saga) ===== */}
        {activeTool !== 'explain-ai' && (
          <>
            <form onSubmit={handleSubmit} className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                {activeTool === 'concept-explainer'
                  ? 'Which concept needs to be explained?'
                  : 'What would you like your mini saga to be about?'}
              </label>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  activeTool === 'concept-explainer'
                    ? 'Enter the concept you want explained...'
                    : 'Enter your story idea or topic...'
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA]"
                rows="4"
              />

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="mt-4 w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </button>
            </form>

            {isLoading && <LoadingIndicator darkmode={false} />}

            {response && (
              <div className="bg-gray-50 rounded-lg p-4 border">
                <h3 className="font-semibold mb-2">Response:</h3>
                <div className="whitespace-pre-wrap">{response}</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </div>
)}
       </div>
     </div>
   );
};

export default Tools;
