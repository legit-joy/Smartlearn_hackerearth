import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAuth } from '../utils/auth';
import { useAuthStatus } from '../utils/useAuthStatus';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStatus();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="w-full px-8 py-4 flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-extrabold text-[#20B2AA] hover:text-[#1a9b95] transition-colors">
            Smartlearn
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/')
                  ? 'text-[#20B2AA] font-semibold bg-[#20B2AA]/10'
                  : 'text-gray-700 hover:text-[#20B2AA] hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </Link>
            
            <Link
              to="/chat"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/chat')
                  ? 'text-[#20B2AA] font-semibold bg-[#20B2AA]/10'
                  : 'text-gray-700 hover:text-[#20B2AA] hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Chat</span>
            </Link>
            
            <Link
              to="/tools"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/tools')
                  ? 'text-[#20B2AA] font-semibold bg-[#20B2AA]/10'
                  : 'text-gray-700 hover:text-[#20B2AA] hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Tools</span>
            </Link>
            
            <Link
              to="/help"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/help')
                  ? 'text-[#20B2AA] font-semibold bg-[#20B2AA]/10'
                  : 'text-gray-700 hover:text-[#20B2AA] hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Help</span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                clearAuth();
                navigate('/', { replace: true });
              }}
              className="px-5 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 text-[#20B2AA] font-semibold rounded-lg hover:bg-[#20B2AA]/10 transition-all"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
