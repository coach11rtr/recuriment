import React from 'react';
import { Users, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

interface ContactUsProps {
  onBack: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onBack }) => {
  const agents = [
    {
      name: 'Denny Antony, MBA',
      region: 'Americas, Middle East, Caribbean, Europe, Japan, and Korea',
      phone: '(+1) 905 477 2962 ext. 28',
      email: 'denny@nasearchg.com'
    },
    {
      name: 'Scott Bradley, FCAS, FCIA',
      region: 'US, Canada, Bermuda, and Europe',
      phone: 'Bermuda +441 705 4824 | US +1 210 764 4887',
      email: 'scott.bradley@nasearchg.com'
    },
    {
      name: 'Teresa Choi',
      region: 'South East Asia and China',
      phone: 'HK +852 8199 0127',
      email: 'teresa.choi@nasearchg.com'
    },
    {
      name: 'Eric Neu, P.ENG',
      region: 'US, Canada',
      phone: 'CA (+1) 905 477 2962 ext 242',
      email: 'eric@nasearchg.com'
    },
    {
      name: 'Iqbal Shah, CEO',
      region: 'Executive Leadership',
      phone: 'Mobile: 416 843 7570 | Office: 905 477 2962 ext. 222',
      email: 'iqbal@nasearchg.com'
    }
  ];

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

      {/* Hero Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg lg:text-xl text-gray-700">
              Get in touch with our team. We're here to help and answer any questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* General Contact Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">General Contact Information</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <a href="mailto:inquire@nasearchg.com" className="text-blue-600 hover:text-blue-700 transition-colors">
                    inquire@nasearchg.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                  <a href="tel:+18772228431" className="text-blue-600 hover:text-blue-700 transition-colors">
                    (+1) 877-222-8431
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Head Office</h3>
                <p className="text-gray-700">Toronto, Canada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Contact Section */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Agent Contact Information</h2>
            <p className="text-center text-gray-600 mb-12">Connect with our specialized agents by region</p>

            <div className="grid md:grid-cols-2 gap-6">
              {agents.map((agent, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{agent.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-4">{agent.region}</p>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                      <a href={`tel:${agent.phone.split('|')[0].trim()}`} className="text-gray-700 hover:text-blue-600 transition-colors text-sm break-words">
                        {agent.phone}
                      </a>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                      <a href={`mailto:${agent.email}`} className="text-blue-600 hover:text-blue-700 transition-colors text-sm break-all">
                        {agent.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Reach out to our team today and discover how TalentConnect can help you find the right opportunity or talent.
            </p>
            <a
              href="mailto:inquire@nasearchg.com"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Send us an Email
            </a>
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
                <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base bg-transparent border-0 cursor-pointer block">Home</button>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base block">About Us</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base block">Contact</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base block">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base block">Terms</a>
              </nav>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 lg:pt-12">
            <p className="text-gray-500 text-sm lg:text-base">© 2025 TalentConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
