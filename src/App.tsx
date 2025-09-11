import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import JobSeekerDashboard from './components/JobSeekerDashboard';
import EmployerDashboard from './components/EmployerDashboard';

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

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'job-seeker' | 'employer'>('landing');
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      posted: '2 days ago',
      description: 'We are looking for a talented Senior Frontend Developer to join our dynamic team. You will be responsible for building and maintaining high-quality web applications using modern technologies.',
      requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
      tags: ['Remote', 'Tech', 'Senior Level'],
      salaryRating: {
        score: 8,
        feedback: 'Competitive salary for senior-level position in San Francisco market',
        marketRange: '$110k - $170k',
        recommendation: 'Salary is well-positioned to attract top talent'
      }
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      company: 'DesignStudio',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$80k - $110k',
      posted: '1 week ago',
      description: 'Join our creative team as a UX/UI Designer. Create intuitive and visually appealing user interfaces for web and mobile applications.',
      requirements: ['Figma', 'Adobe Creative Suite', 'User Research', '3+ years experience'],
      tags: ['Design', 'Creative', 'Hybrid'],
      salaryRating: {
        score: 7,
        feedback: 'Good salary range for mid-level UX/UI position in New York',
        marketRange: '$75k - $120k',
        recommendation: 'Consider highlighting additional benefits to enhance competitiveness'
      }
    },
    {
      id: '3',
      title: 'Data Scientist',
      company: 'DataInsights',
      location: 'Austin, TX',
      type: 'Contract',
      salary: '$90k - $130k',
      posted: '3 days ago',
      description: 'Analyze complex datasets to derive actionable insights. Work with machine learning models and statistical analysis.',
      requirements: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
      tags: ['Data', 'Analytics', 'Remote'],
      salaryRating: {
        score: 6,
        feedback: 'Average salary for data science role, competitive for contract position',
        marketRange: '$85k - $140k',
        recommendation: 'Consider increasing upper range to attract more experienced candidates'
      }
    }
  ]);

  const addJob = (newJob: Omit<Job, 'id' | 'posted'>) => {
    const job: Job = {
      ...newJob,
      id: Date.now().toString(),
      posted: 'Just now'
    };
    setJobs(prev => [job, ...prev]);
  };

  return (
    <div className="min-h-screen">
      {currentView === 'landing' && (
        <LandingPage 
          onGetJob={() => setCurrentView('job-seeker')}
          onPostJob={() => setCurrentView('employer')}
        />
      )}
      {currentView === 'job-seeker' && (
        <JobSeekerDashboard 
          onBack={() => setCurrentView('landing')} 
          jobs={jobs}
        />
      )}
      {currentView === 'employer' && (
        <EmployerDashboard 
          onBack={() => setCurrentView('landing')} 
          onAddJob={addJob}
        />
      )}
    </div>
  );
}

export default App;