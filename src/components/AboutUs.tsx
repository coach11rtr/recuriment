import React from 'react';
import { Users, ArrowLeft } from 'lucide-react';

interface AboutUsProps {
  onBack: () => void;
  onContact?: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onBack, onContact }) => {
  return (
    <div className="min-h-screen bg-white">
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
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </header>

      {/* Who We Are Section */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center">About TalentConnect</h1>

            <div className="space-y-8 lg:space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  TalentConnect is a recruitment agency based in the United States that connects professionals with employers across North America. We work with companies of all sizes and focus on long term matches rather than quick placements.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our consultants take time to understand both candidates and employers so that every hire makes sense for everyone involved.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our mission is to provide honest and reliable recruitment services built on trust, confidentiality, and clear communication. We listen carefully, act responsibly, and continuously improve how we serve both job seekers and employers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Job Seekers Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">For Job Seekers</h2>
            <p className="text-center text-lg text-gray-600 mb-12">How TalentConnect works for you</p>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                When you join TalentConnect, you are not just another profile in a database. You create a genuine professional presence and share your background with our team. We review your resume carefully and take the time to understand what matters to you in your next role.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our recruitment consultants have real experience in the fields we specialize in. You will speak directly with someone who understands your industry and your career aspirations. We can guide you through opportunities that align with your skills and goals, and we support you throughout interviews and job transitions.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We give you access to relevant job opportunities that match your profile, and we keep you informed at every step. We believe the best placements happen when candidates understand exactly what a role entails and feel confident about their decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">For Employers</h2>
            <p className="text-center text-lg text-gray-600 mb-12">How TalentConnect supports your hiring</p>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Hiring takes time and effort. TalentConnect helps by giving you access to a qualified pool of candidates who have already been screened and vetted by our team. When you need to fill a role, we review candidate profiles and resumes carefully to identify people who genuinely fit what you are looking for.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our recruitment experts work with you to understand your company culture, the specific skills you need, and your hiring timeline. We can advise you on what the market looks like for the roles you are trying to fill and help you make faster and more reliable hiring decisions. We handle the background work so you can focus on what matters in your business.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We see value in building relationships with both candidates and employers. Good hires stick around and perform well. That is why we focus on quality matches rather than just moving people through the door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <span className="text-lg lg:text-xl font-bold">TalentConnect</span>
              </div>
              <p className="text-gray-400 text-sm lg:text-base">Connecting professionals with opportunity across North America.</p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Useful Links</h4>
              <nav className="space-y-2">
                <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base bg-transparent border-0 cursor-pointer">Home</button>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base block">About Us</a>
                {onContact && <button onClick={onContact} className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base block bg-transparent border-0 cursor-pointer">Contact</button>}
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base block">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base block">Terms</a>
              </nav>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 lg:pt-12">
            <div className="mb-4">
              <p className="text-gray-400 text-sm lg:text-base mb-4">We would love to hear from you. Share your feedback or let us know how we can help.</p>
            </div>
            <p className="text-gray-500 text-sm lg:text-base">© 2025 TalentConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
