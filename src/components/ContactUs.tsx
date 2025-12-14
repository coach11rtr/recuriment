import React from 'react';
import { Users, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

interface ContactUsProps {
  onBack: () => void;
}

interface Agent {
  name: string;
  region: string;
  email: string;
  phone?: string; // ✅ optional
}

const ContactUs: React.FC<ContactUsProps> = ({ onBack }) => {
  const agents: Agent[] = [
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
      name: 'Anthony Robert',
      region: 'US, Canada',
      email: 'anthony@nasearchg.com' // ✅ no phone
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

      {/* Hero */}
      <section className="py-12 lg:py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg lg:text-xl text-gray-700">
            Get in touch with our team. We're here to help.
          </p>
        </div>
      </section>

      {/* Agent Contact Section */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Agent Contact Information
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Connect with our specialized agents by region
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {agents.map((agent, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium mb-4">
                    {agent.region}
                  </p>

                  <div className="space-y-3">
                    {/* ✅ PHONE — only if exists */}
                    {agent.phone && (
                      <div className="flex items-start space-x-3">
                        <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                        <a
                          href={`tel:${agent.phone.split('|')[0].trim()}`}
                          className="text-gray-700 hover:text-blue-600 transition-colors text-sm break-words"
                        >
                          {agent.phone}
                        </a>
                      </div>
                    )}

                    {/* EMAIL */}
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                      <a
                        href={`mailto:${agent.email}`}
                        className="text-blue-600 hover:text-blue-700 transition-colors text-sm break-all"
                      >
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
    </div>
  );
};

export default ContactUs;
