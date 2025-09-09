import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MessageCircle, Send, Bot, User, Loader2, Sparkles, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
}

interface AIChatbotProps {
  onBack: () => void;
  userProfile?: {
    name: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
  };
  resumeData?: ResumeData | null;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ onBack, userProfile, resumeData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AI Career Assistant. I'm here to help you with job search strategies, career guidance, upskilling recommendations, and planning your professional future. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const genAI = new GoogleGenerativeAI('AIzaSyDcESYR34GEMPJlOT_3ByoFHvY7VPPqly0');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateUserContext = () => {
    let context = "User Profile Context:\n";
    
    if (userProfile) {
      context += `Name: ${userProfile.name}\n`;
      context += `Location: ${userProfile.location}\n`;
      context += `Bio: ${userProfile.bio}\n`;
    }

    if (resumeData) {
      context += "\nResume Information:\n";
      context += `Professional Summary: ${resumeData.personalInfo.summary}\n`;
      
      if (resumeData.experience.length > 0) {
        context += "\nWork Experience:\n";
        resumeData.experience.forEach((exp, index) => {
          context += `${index + 1}. ${exp.title} at ${exp.company} (${exp.duration})\n`;
          context += `   ${exp.description}\n`;
        });
      }

      if (resumeData.education.length > 0) {
        context += "\nEducation:\n";
        resumeData.education.forEach((edu, index) => {
          context += `${index + 1}. ${edu.degree} from ${edu.school} (${edu.year})\n`;
        });
      }

      if (resumeData.skills.length > 0) {
        context += `\nSkills: ${resumeData.skills.join(', ')}\n`;
      }
    }

    return context;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const userContext = generateUserContext();
      
      const prompt = `
        You are an AI Career Assistant helping users with job search, career guidance, and professional development. 
        
        ${userContext}
        
        Based on the user's profile and resume information above, provide personalized career advice. 
        
        Guidelines:
        - Be helpful, encouraging, and professional
        - Provide specific, actionable advice
        - Consider their current experience level and skills
        - Suggest relevant upskilling opportunities
        - Help with job search strategies
        - Provide career path recommendations
        - Keep responses concise but comprehensive
        - Use a friendly, conversational tone
        
        User Question: ${inputMessage}
        
        Provide a helpful response based on their profile and career goals.
      `;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const botResponse = response.text();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickQuestions = [
    "How can I improve my resume?",
    "What skills should I learn for my career?",
    "How do I prepare for job interviews?",
    "What career paths are available to me?",
    "How can I negotiate my salary?",
    "What are the trending jobs in my field?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        <div className="text-center">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1">AI Career Assistant</h1>
          <p className="text-sm text-gray-600">Get personalized career guidance, job search tips, and upskilling recommendations</p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 space-y-6 max-w-6xl mx-auto w-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} w-full`}
            >
              <div className={`flex items-start space-x-3 lg:space-x-4 max-w-4xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  )}
                </div>
                <div className={`rounded-2xl px-4 lg:px-6 py-3 lg:py-4 shadow-sm ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed text-base lg:text-lg">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 lg:space-x-4 max-w-4xl">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-4 lg:px-6 py-3 lg:py-4 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                    <span className="text-base lg:text-lg text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-4 lg:px-8 py-6 border-t border-gray-200 bg-white max-w-6xl mx-auto w-full">
            <p className="text-base font-medium text-gray-700 mb-4">Quick questions to get started:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm lg:text-base text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors text-left shadow-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="px-4 lg:px-8 py-4 lg:py-6 border-t border-gray-200 bg-white max-w-6xl mx-auto w-full">
          <div className="flex space-x-3 lg:space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your career, job search, or skills development..."
                className="w-full p-3 lg:p-4 pr-12 lg:pr-14 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-base lg:text-lg shadow-sm"
                rows={2}
                style={{ minHeight: '60px', maxHeight: '150px' }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="absolute right-2 lg:right-3 top-2 lg:top-3 p-2 lg:p-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <Send className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;