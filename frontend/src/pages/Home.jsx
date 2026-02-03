import { Link } from 'react-router-dom';
import homeWomanImage from '../assets/home-woman.svg';
import { useAuthStatus } from '../utils/useAuthStatus';

const Home = () => {
  const { isAuthenticated } = useAuthStatus();

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#E0F7FA] via-white to-[#F3E5F5] flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 w-full">
          {/* Left Section */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 flex flex-col justify-center">
            {/* Hero Text Section */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Advanced <span className="text-orange-500">AI</span> <span className="text-orange-500">driven</span> digital assistant
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-2xl">
                Instant support for teachers and school leaders. Save time everyday using our powerful AI teaching tools – from creating bespoke lesson plans or presentations to generating personalised student reports and completing leadership tasks.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              {!isAuthenticated && (
                <Link
                  to="/signup"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200 text-sm sm:text-base"
                >
                  Try for free
                </Link>
              )}
              <Link
                to="/documentation"
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-900 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200 text-sm sm:text-base"
              >
                Learn more
              </Link>
            </div>
            
            {/* Banner Text */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-[1.4] tracking-tight pt-2">
              Leading the next chapter in education with <span className="text-orange-500">AI Powered</span> learning
            </h2>
          </div>

          {/* Right Section - Image */}
          <div className="hidden lg:flex items-center justify-center relative w-full">
            <div className="relative w-full flex items-center justify-center">
              {/* Decorative background gradient layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#20B2AA]/15 via-transparent to-[#F3E5F5]/25 rounded-3xl blur-3xl transform scale-110 -z-0"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/10 via-transparent to-[#E0F7FA]/20 rounded-3xl blur-2xl transform scale-105 -z-0"></div>
              
              {/* Image with modern styling */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <img 
                  src={homeWomanImage} 
                  alt="Collaborative team working on digital projects" 
                  className="w-full h-auto max-h-[500px] object-contain drop-shadow-[0_25px_70px_rgba(0,0,0,0.12)] transition-all duration-700 ease-out"
                  loading="eager"
                />
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-[#20B2AA]/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-20 left-10 w-32 h-32 bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;