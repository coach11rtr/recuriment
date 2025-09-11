import React, { useState } from 'react';
import OnboardingOverlay from './OnboardingOverlay';
import AIResumeBuilder from './AIResumeBuilder';
import ResumeRating from './ResumeRating';
import AIChatbot from './AIChatbot';
import { 
  User, 
  FileText, 
  Briefcase, 
  Settings, 
  Home,
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  ChevronLeft,
  Star,
  Send,
  Sparkles,
  TrendingUp,
  MessageCircle,
  Menu,
  X
} from 'lucide-react';

interface JobSeekerDashboardProps {
  onBack: () => void;
  jobs: Job[];
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  tags: string[];
  salaryRating?: {
    score: number;
    feedback: string;
    marketRange: string;
    recommendation: string;
  };
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

const JobSeekerDashboard: React.FC<JobSeekerDashboardProps> = ({ onBack, jobs }) => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showAIBuilder, setShowAIBuilder] = useState(false);
  const [showResumeRating, setShowResumeRating] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [savedResume, setSavedResume] = useState<ResumeData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('jobseeker-onboarding-completed');
  });

  const onboardingSteps = [
    {
      id: 'sidebar-navigation',
      target: '[data-onboarding="sidebar-navigation"]',
      title: 'Navigation Menu',
      description: 'Use this sidebar to navigate between different sections of your dashboard.',
      position: 'right' as const
    },
    {
      id: 'browse-jobs',
      target: '[data-onboarding="browse-jobs"]',
      title: 'Browse Jobs',
      description: 'Search and filter through thousands of job opportunities that match your skills.',
      position: 'right' as const
    },
    {
      id: 'ai-resume',
      target: '[data-onboarding="ai-resume"]',
      title: 'AI Resume Builder',
      description: 'Create a professional resume instantly using our AI-powered resume builder.',
      position: 'right' as const
    },
    {
      id: 'resume-rating',
      target: '[data-onboarding="resume-rating"]',
      title: 'Resume Rating',
      description: 'Get personalized feedback on how well your resume matches specific job requirements.',
      position: 'bottom' as const
    },
    {
      id: 'ai-assistant',
      target: '[data-onboarding="ai-assistant"]',
      title: 'AI Career Assistant',
      description: 'Get personalized career advice, job search tips, and skill development recommendations.',
      position: 'right' as const
    }
  ];

  const handleOnboardingComplete = () => {
    localStorage.setItem('jobseeker-onboarding-completed', 'true');
    setShowOnboarding(false);
  };

  const handleOnboardingSkip = () => {
    localStorage.setItem('jobseeker-onboarding-completed', 'true');
    setShowOnboarding(false);
  };

  const handleSaveResume = (resumeData: ResumeData) => {
    setSavedResume(resumeData);
    setShowAIBuilder(false);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Mock user profile data
  const userProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate frontend developer with 5+ years of experience building responsive web applications...'
  };
  const renderSidebar = () => (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      <div 
        data-onboarding="sidebar-navigation"
        className="h-full"
      >
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
        <button 
          onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Job Seeker</h2>
      </div>
      
      <nav className="p-4">
        <div className="space-y-2">
          <button
            data-onboarding="browse-jobs"
            onClick={() => setActiveTab('jobs')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'jobs' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => {
              setActiveTab('jobs');
              setIsMobileMenuOpen(false);
            }}
          >
            <Briefcase className="w-5 h-5" />
            <span>Browse Jobs</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('profile');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
          <button
            data-onboarding="ai-resume"
            onClick={() => {
              setActiveTab('resume');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'resume' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Resume</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('applications');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'applications' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Send className="w-5 h-5" />
            <span>Applications</span>
          </button>
          <button
            data-onboarding="ai-assistant"
            onClick={() => {
              setActiveTab('chatbot');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'chatbot' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>AI Assistant</span>
          </button>
        </div>
      </nav>
      </div>
      </div>
    </>
  );

  const renderJobSearch = () => (
    <div className="flex-1 p-4 lg:p-6">
      {/* Mobile Header */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {/* Search Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Find Your Next Opportunity</h1>
          <button
            data-onboarding="resume-rating"
            onClick={() => setShowResumeRating(true)}
            className="px-3 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm lg:text-base"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="hidden sm:inline">Rate My Resume</span>
            <span className="sm:hidden">Rate</span>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, companies, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`p-4 lg:p-6 border rounded-xl cursor-pointer transition-all hover:shadow-md ${
                selectedJob?.id === job.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800 pr-2">{job.title}</h3>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>
              
              <p className="text-blue-600 font-medium mb-2">{job.company}</p>
              
              <div className="flex flex-wrap gap-2 lg:gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
                {job.salaryRating && (
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-600 font-medium text-sm">{job.salaryRating.score}/10</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {job.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-gray-500">{job.posted}</p>
            </div>
          ))}
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or category filter</p>
            </div>
          )}
        </div>

        {/* Job Details */}
        <div className="lg:sticky lg:top-6">
          {selectedJob ? (
            <div className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6">
              <div className="mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{selectedJob.title}</h2>
                <p className="text-blue-600 font-medium text-base lg:text-lg mb-4">{selectedJob.company}</p>
                
                <div className="flex flex-wrap gap-2 lg:gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedJob.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{selectedJob.salary}</span>
                  </div>
                  {selectedJob.salaryRating && (
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-600 font-medium">{selectedJob.salaryRating.score}/10 Salary Rating</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Salary Rating Details */}
              {selectedJob.salaryRating && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="text-base font-semibold text-blue-700">Salary Analysis</h3>
                    <span className="text-lg font-bold text-blue-600">{selectedJob.salaryRating.score}/10</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{selectedJob.salaryRating.feedback}</p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Market Range:</span> {selectedJob.salaryRating.marketRange}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3">Job Description</h3>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{selectedJob.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm lg:text-base text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full py-3 lg:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 text-sm lg:text-base">
                Apply Now
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 lg:p-12 text-center">
              <Briefcase className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg lg:text-xl font-semibold text-gray-600 mb-2">Select a job to view details</h3>
              <p className="text-sm lg:text-base text-gray-500">Click on any job listing to see more information and apply</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="flex-1 p-4 lg:p-6">
      {/* Mobile Header */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Profile Settings</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">John Doe</h2>
            <p className="text-gray-600">Frontend Developer</p>
            <p className="text-sm text-gray-500">San Francisco, CA</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              defaultValue="John Doe" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              defaultValue="john@example.com" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input 
              type="tel" 
              defaultValue="+1 (555) 123-4567" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input 
              type="text" 
              defaultValue="San Francisco, CA" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea 
            rows={3}
            defaultValue="Passionate frontend developer with 5+ years of experience building responsive web applications..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mt-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderResume = () => (
    <div className="flex-1 p-4 lg:p-6">
      {/* Mobile Header */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {showAIBuilder ? (
        <AIResumeBuilder 
          onSave={handleSaveResume}
          onBack={() => setShowAIBuilder(false)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Resume Builder</h1>
            <button
              onClick={() => setShowAIBuilder(true)}
              className="px-3 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm lg:text-base"
            >
              <Sparkles className="w-5 h-5" />
              <span className="hidden sm:inline">AI Resume Builder</span>
              <span className="sm:hidden">AI Builder</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
            {savedResume ? (
              <>
                {/* AI Generated Resume Display */}
                <div className="mb-6 p-3 lg:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2 text-purple-700">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-medium">AI-Generated Resume</span>
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8 pb-6 border-b border-gray-200">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{savedResume.personalInfo.name}</h1>
                  <div className="flex flex-wrap justify-center gap-2 lg:gap-4 text-sm lg:text-base text-gray-600">
                    <span>{savedResume.personalInfo.email}</span>
                    <span>•</span>
                    <span>{savedResume.personalInfo.phone}</span>
                    <span>•</span>
                    <span>{savedResume.personalInfo.location}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-8">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-3">Professional Summary</h2>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{savedResume.personalInfo.summary}</p>
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4">Experience</h2>
                  <div className="space-y-6">
                    {savedResume.experience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-blue-600 pl-4 lg:pl-6">
                        <h3 className="text-base lg:text-lg font-semibold text-gray-800">{exp.title}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                        <p className="text-sm lg:text-base text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-8">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4">Education</h2>
                  <div className="space-y-4">
                    {savedResume.education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-green-600 pl-4 lg:pl-6">
                        <h3 className="text-base lg:text-lg font-semibold text-gray-800">{edu.degree}</h3>
                        <p className="text-green-600 font-medium">{edu.school}</p>
                        <p className="text-sm text-gray-500">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {savedResume.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Default Resume Template */}
                <div className="mb-8">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4">Experience</h2>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-600 pl-4 lg:pl-6">
                      <h3 className="text-base lg:text-lg font-semibold text-gray-800">Senior Frontend Developer</h3>
                      <p className="text-blue-600 font-medium">TechCorp Inc.</p>
                      <p className="text-sm text-gray-500 mb-2">2021 - Present</p>
                      <p className="text-sm lg:text-base text-gray-600">Led development of responsive web applications using React and TypeScript...</p>
                    </div>
                    <div className="border-l-4 border-gray-300 pl-4 lg:pl-6">
                      <h3 className="text-base lg:text-lg font-semibold text-gray-800">Frontend Developer</h3>
                      <p className="text-blue-600 font-medium">StartupXYZ</p>
                      <p className="text-sm text-gray-500 mb-2">2019 - 2021</p>
                      <p className="text-sm lg:text-base text-gray-600">Developed and maintained user interfaces for web applications...</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Node.js', 'Git', 'Figma'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4">Education</h2>
                  <div className="border-l-4 border-green-600 pl-4 lg:pl-6">
                    <h3 className="text-base lg:text-lg font-semibold text-gray-800">Bachelor of Computer Science</h3>
                    <p className="text-green-600 font-medium">University of California</p>
                    <p className="text-sm text-gray-500">2015 - 2019</p>
                  </div>
                </div>
              </>
            )}
            
            <div className="mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => {
                  // Create a simple PDF download for the default resume
                  const element = document.createElement('a');
                  const file = new Blob(['Resume content would be here'], {type: 'text/plain'});
                  element.href = URL.createObjectURL(file);
                  element.download = 'resume.pdf';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                className="px-4 py-2 lg:px-6 lg:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base"
              >
                Download PDF
              </button>
              <button 
                onClick={() => setShowAIBuilder(true)}
                className="px-4 py-2 lg:px-6 lg:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm lg:text-base"
              >
                {savedResume ? 'Regenerate with AI' : 'Edit Resume'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderApplications = () => (
    <div className="flex-1 p-4 lg:p-6">
      {/* Mobile Header */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">My Applications</h1>
      <div className="space-y-4">
        {[
          { title: 'Senior Frontend Developer', company: 'TechCorp', status: 'Interview Scheduled', statusColor: 'blue' },
          { title: 'UX/UI Designer', company: 'DesignStudio', status: 'Under Review', statusColor: 'yellow' },
          { title: 'Full Stack Developer', company: 'StartupABC', status: 'Rejected', statusColor: 'red' }
        ].map((app, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800 pr-2">{app.title}</h3>
                <p className="text-blue-600 font-medium">{app.company}</p>
                <p className="text-sm text-gray-500 mt-1">Applied 3 days ago</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                app.statusColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                app.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {app.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {showOnboarding && (
        <OnboardingOverlay
          steps={onboardingSteps}
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
      
      {showResumeRating ? (
        <div className="flex-1">
          <ResumeRating onBack={() => setShowResumeRating(false)} />
        </div>
      ) : showChatbot ? (
        <div className="flex-1">
          <AIChatbot 
            onBack={() => setShowChatbot(false)}
            userProfile={userProfile}
            resumeData={savedResume}
          />
        </div>
      ) : (
        <>
          {renderSidebar()}
          <div className="flex-1 lg:ml-0">
            {activeTab === 'jobs' && renderJobSearch()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'resume' && renderResume()}
            {activeTab === 'applications' && renderApplications()}
          </div>
          {activeTab === 'chatbot' && (
            <div className="flex-1">
              <AIChatbot 
                onBack={() => setActiveTab('jobs')}
                userProfile={userProfile}
                resumeData={savedResume}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobSeekerDashboard;