import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Tools from './pages/Tools';
import Help from './pages/Help';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Documentation from './pages/Documentation';
import { isAuthenticated } from './utils/auth';

// Component to handle page reload redirect
const ReloadHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Detect if page was reloaded
    const navigationType = performance.getEntriesByType('navigation')[0]?.type;
    const isReload = navigationType === 'reload';

    // If page was reloaded and not on home page, redirect to home
    if (isReload && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, []); // Run only once on mount

  return null;
};

const RequireAuth = ({ children }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

function App() {
  return (
    <div className="h-screen flex flex-col">
      <ReloadHandler />
      <Navbar />
      <div className="flex-1 min-h-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/chat"
            element={
              <RequireAuth>
                <Chat />
              </RequireAuth>
            }
          />
          <Route
            path="/tools"
            element={
              <RequireAuth>
                <Tools />
              </RequireAuth>
            }
          />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/documentation" element={<Documentation />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;