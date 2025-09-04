import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone: string | null;
          location: string | null;
          bio: string | null;
          user_type: 'job_seeker' | 'employer';
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email: string;
          phone?: string | null;
          location?: string | null;
          bio?: string | null;
          user_type: 'job_seeker' | 'employer';
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          location?: string | null;
          bio?: string | null;
          user_type?: 'job_seeker' | 'employer';
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      resumes: {
        Row: {
          id: string;
          user_id: string;
          personal_info: any;
          experience: any;
          education: any;
          skills: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          personal_info: any;
          experience: any;
          education: any;
          skills: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          personal_info?: any;
          experience?: any;
          education?: any;
          skills?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          employer_id: string;
          title: string;
          company: string;
          location: string;
          type: string;
          salary: string;
          description: string;
          requirements: string[];
          tags: string[];
          status: 'active' | 'draft' | 'closed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          employer_id: string;
          title: string;
          company: string;
          location: string;
          type: string;
          salary: string;
          description: string;
          requirements: string[];
          tags: string[];
          status?: 'active' | 'draft' | 'closed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          employer_id?: string;
          title?: string;
          company?: string;
          location?: string;
          type?: string;
          salary?: string;
          description?: string;
          requirements?: string[];
          tags?: string[];
          status?: 'active' | 'draft' | 'closed';
          created_at?: string;
          updated_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          job_id: string;
          applicant_id: string;
          status: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'hired';
          cover_letter: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          applicant_id: string;
          status?: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'hired';
          cover_letter?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          applicant_id?: string;
          status?: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'hired';
          cover_letter?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};