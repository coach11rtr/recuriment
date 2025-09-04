import React from 'react';
import { Users, Briefcase, Star, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onGetJob: () => void;
  onPostJob: () => void;
  user?: any;
  onSignOut?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetJob, onPostJob, user, onSignOut }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 lg:px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TalentConnect
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            {user && onSignOut && (
              <button
                onClick={onSignOut}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-6 py-12 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Connect Talent with 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Opportunity
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 mb-8 lg:mb-12 leading-relaxed px-4">
            The premier platform where exceptional talent meets innovative companies. 
            Build your career or find your next star employee with our cutting-edge recruitment solutions.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-12 lg:mb-16 px-4">
            <button 
              onClick={onGetJob}
              className="group px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-base lg:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Briefcase className="w-5 h-5 lg:w-6 lg:h-6" />
              <span>Find Your Dream Job</span>
              <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onPostJob}
              className="group px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold text-base lg:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5 lg:w-6 lg:h-6" />
              <span>Hire Top Talent</span>
              <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 px-4">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-sm lg:text-base text-gray-600">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-2">100K+</div>
              <div className="text-sm lg:text-base text-gray-600">Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">5K+</div>
              <div className="text-sm lg:text-base text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-sm lg:text-base text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose TalentConnect?</h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Advanced features designed to streamline your recruitment process and accelerate career growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 px-4">
            <div className="text-center p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <Star className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Smart Matching</h3>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                AI-powered algorithms ensure perfect job-candidate matches based on skills, experience, and culture fit
              </p>
            </div>
            
            <div className="text-center p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Career Growth</h3>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                Comprehensive tools for skill development, portfolio building, and career advancement tracking
              </p>
            </div>
            
            <div className="text-center p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Verified Quality</h3>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                Rigorous verification process ensures authentic profiles and legitimate job opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <span className="text-lg lg:text-xl font-bold">TalentConnect</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm lg:text-base text-gray-400 mb-2">© 2025 TalentConnect. All rights reserved.</p>
              <p className="text-sm lg:text-base text-gray-400">Connecting talent with opportunity, globally.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;