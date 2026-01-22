const Documentation = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Documentation</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
              <p className="text-gray-700 mb-4">
                Welcome to smartlearn! This guide will help you get started with our AI-powered digital assistant
                designed for education providers.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Voice Assistant</h3>
                  <p className="text-gray-700">
                    Interact with our AI-powered digital assistant using voice commands for a hands-free, seamless experience.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">AI Powered Tools</h3>
                  <p className="text-gray-700">
                    Access a suite of powerful AI tools including Concept Explainer and Mini Saga to enhance your teaching and learning experience.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Free of Cost</h3>
                  <p className="text-gray-700">
                    Access all our powerful AI teaching tools completely free of cost. No hidden fees, no subscription required.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Use</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>Sign up for a free account to get started</li>
                <li>Navigate to the Chat page to interact with our AI assistant using text or voice</li>
                <li>Visit the Tools page to access specialized AI tools like Concept Explainer and Mini Saga</li>
                <li>Use Concept Explainer to get detailed explanations of any concept you want to understand</li>
                <li>Create engaging mini sagas (150-word stories) using the Mini Saga tool for creative writing exercises</li>
              </ol>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Support</h2>
              <p className="text-gray-700 mb-4">
                Need help? Visit our Help page or contact our support team for assistance.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;