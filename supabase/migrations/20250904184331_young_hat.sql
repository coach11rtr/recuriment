/*
  # Create jobs table

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `employer_id` (uuid, foreign key to auth.users)
      - `title` (text, job title)
      - `company` (text, company name)
      - `location` (text, job location)
      - `type` (text, employment type)
      - `salary` (text, salary range)
      - `description` (text, job description)
      - `requirements` (text[], array of requirements)
      - `tags` (text[], array of tags)
      - `status` (text, job status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `jobs` table
    - Add policy for public read access to active jobs
    - Add policy for employers to manage their own jobs
*/

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  type text NOT NULL DEFAULT 'Full-time',
  salary text NOT NULL DEFAULT 'Competitive',
  description text NOT NULL,
  requirements text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'closed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to active jobs
CREATE POLICY "Anyone can view active jobs"
  ON jobs
  FOR SELECT
  USING (status = 'active');

-- Policy for employers to manage their own jobs
CREATE POLICY "Employers can manage their own jobs"
  ON jobs
  FOR ALL
  TO authenticated
  USING (auth.uid() = employer_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_employer_id ON jobs(employer_id);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();