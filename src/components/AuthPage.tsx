import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Github, Loader2, AlertCircle } from 'lucide-react';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState<'job_seeker' | 'employer'>('job_seeker');

  const handleSocialAuth = async (provider: 'google' | 'github' | 'twitter') => {
    setIsLoading(true);
    setLoadingProvider(provider);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            user_type: userType
          }
        }
      });

      if (error) throw error;
      
      // The redirect will handle the rest
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const AuthButton = ({ 
    provider, 
    icon, 
    label, 
    bgColor, 
    hoverColor, 
    textColor = 'text-white' 
  }: {
    provider: 'google' | 'github' | 'twitter';
    icon: React.ReactNode;
    label: string;
    bgColor: string;
    hoverColor: string;
    textColor?: string;
  }) => (
    <button
      onClick={() => handleSocialAuth(provider)}
      disabled={isLoading}
      className={`w-full flex items-center justify-center space-x-3 py-3 px-4 ${bgColor} ${textColor} rounded-lg font-semibold ${hoverColor} disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 hover:shadow-lg`}
    >
      {loadingProvider === provider ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        icon
      )}
      <span>{loadingProvider === provider ? 'Connecting...' : `Continue with ${label}`}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            TalentConnect
          </h1>
          <p className="text-gray-600">
            Sign in to access your personalized job search and recruitment platform
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 mb-6">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('job_seeker')}
                disabled={isLoading}
                className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                  userType === 'job_seeker'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Job Seeker
              </button>
              <button
                type="button"
                onClick={() => setUserType('employer')}
                disabled={isLoading}
                className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                  userType === 'employer'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Employer
              </button>
            </div>
          </div>

          {/* Social Authentication Buttons */}
          <div className="space-y-3">
            <AuthButton
              provider="google"
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              }
              label="Google"
              bgColor="bg-white border border-gray-300"
              hoverColor="hover:bg-gray-50"
              textColor="text-gray-700"
            />

            <AuthButton
              provider="github"
              icon={<Github className="w-5 h-5" />}
              label="GitHub"
              bgColor="bg-gray-900"
              hoverColor="hover:bg-gray-800"
            />

            <AuthButton
              provider="twitter"
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              }
              label="X (Twitter)"
              bgColor="bg-black"
              hoverColor="hover:bg-gray-800"
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Secure authentication powered by industry-leading OAuth providers
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;