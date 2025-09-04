import React, { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from './lib/supabase';
import AuthPage from './components/AuthPage';
import OnboardingFlow from './components/OnboardingFlow';
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
}

function App() {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'job-seeker' | 'employer'>('landing');
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    checkAuth();
    loadJobs();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        await loadUserProfile(session.user.id);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (profile) {
        setUserProfile(profile);
        setNeedsOnboarding(!profile.onboarding_completed);
        setCurrentView(profile.user_type === 'job_seeker' ? 'job-seeker' : 'employer');
      } else {
        setNeedsOnboarding(true);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadJobs = async () => {
    try {
      const { data: jobsData, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedJobs: Job[] = jobsData.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        salary: job.salary,
        posted: formatTimeAgo(job.created_at),
        description: job.description,
        requirements: job.requirements,
        tags: job.tags
      }));

      setJobs(formattedJobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
      // Load default jobs if database fails
      setJobs([
        {
          id: '1',
          title: 'Senior Frontend Developer',
          company: 'TechCorp',
          location: 'San Francisco, CA',
          type: 'Full-time',
          salary: '$120k - $160k',
          posted: '2 days ago',
          description: 'We are looking for a talented Senior Frontend Developer to join our dynamic team.',
          requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
          tags: ['Remote', 'Tech', 'Senior Level']
        }
      ]);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks === 1) return '1 week ago';
    return `${diffInWeeks} weeks ago`;
  };

  const addJob = async (newJob: Omit<Job, 'id' | 'posted'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          employer_id: user.id,
          title: newJob.title,
          company: newJob.company,
          location: newJob.location,
          type: newJob.type,
          salary: newJob.salary,
          description: newJob.description,
          requirements: newJob.requirements,
          tags: newJob.tags,
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      // Add to local state for immediate UI update
      const job: Job = {
        id: data.id,
        title: data.title,
        company: data.company,
        location: data.location,
        type: data.type,
        salary: data.salary,
        posted: 'Just now',
        description: data.description,
        requirements: data.requirements,
        tags: data.tags
      };
      
      setJobs(prev => [job, ...prev]);
    } catch (error) {
      console.error('Error adding job:', error);
      // Fallback to local state if database fails
      const job: Job = {
        ...newJob,
        id: Date.now().toString(),
        posted: 'Just now'
      };
      setJobs(prev => [job, ...prev]);
    }
  };

  const handleAuthSuccess = () => {
    checkAuth();
  };

  const handleOnboardingComplete = () => {
    setNeedsOnboarding(false);
    checkAuth();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    setCurrentView('landing');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  if (needsOnboarding && userProfile) {
    return (
      <OnboardingFlow 
        user={user}
        userType={userProfile.user_type}
        onComplete={handleOnboardingComplete}
      />
    );
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
          user={user}
          onSignOut={handleSignOut}
        />
      )}
      {currentView === 'job-seeker' && (
        <JobSeekerDashboard 
          onBack={() => setCurrentView('landing')}
          onSignOut={handleSignOut}
          jobs={jobs}
          user={user}
        />
      )}
      {currentView === 'employer' && (
        <EmployerDashboard 
          onBack={() => setCurrentView('landing')}
          onSignOut={handleSignOut}
          onAddJob={addJob}
          user={user}
        />
      )}
    </div>
  );
}

export default App;