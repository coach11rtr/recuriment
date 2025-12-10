import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Star, FileText, Briefcase, Loader2, CheckCircle, AlertCircle, TrendingUp, Target } from 'lucide-react';

interface ResumeRatingProps {
  onBack: () => void;
}

interface RatingResult {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  matchPercentage: number;
  skillsMatch: string[];
  missingSkills: string[];
}

const ResumeRating: React.FC<ResumeRatingProps> = ({ onBack }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    resumeText: ''
  });
  const [ratingResult, setRatingResult] = useState<RatingResult | null>(null);

  const genAI = new GoogleGenerativeAI('AIzaSyDeuDXluDkLSNaaJBzsR30uilQ4kRXVaAw');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const analyzeResume = async () => {
    setIsAnalyzing(true);
    try {
      const prompt = `
        Analyze the following resume against the job requirements and provide a detailed rating. Return the response in JSON format with the exact structure shown below:

        Job Title: ${formData.jobTitle}
        Job Description: ${formData.jobDescription}
        
        Resume Content: ${formData.resumeText}

        Please analyze the resume and provide:
        1. Overall score out of 100
        2. Match percentage with the job requirements
        3. Key strengths that align with the job
        4. Areas for improvement
        5. Specific suggestions for enhancement
        6. Skills that match the job requirements
        7. Missing skills that should be added

        Return ONLY valid JSON in this exact format:
        {
          "overallScore": number,
          "matchPercentage": number,
          "strengths": ["string"],
          "weaknesses": ["string"],
          "suggestions": ["string"],
          "skillsMatch": ["string"],
          "missingSkills": ["string"]
        }
      `;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const ratingData = JSON.parse(jsonMatch[0]);
        setRatingResult(ratingData);
      } else {
        throw new Error('Invalid response format');
      }
      
    } catch (error) {
      console.error('Error analyzing resume:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('503') && errorMessage.includes('overloaded')) {
        alert('The AI service is currently busy. Please try again in a few moments.');
      } else {
        alert('Failed to analyze resume. Please try again.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const renderStars = (score: number) => {
    const stars = Math.round(score / 20); // Convert to 5-star scale
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const isFormValid = formData.jobTitle && formData.jobDescription && formData.resumeText;

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
        >
          <Target className="w-5 h-5" />
          <span>Back to Jobs</span>
        </button>
        <div className="text-center">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">AI Resume Rating</h1>
          <p className="text-sm lg:text-base text-gray-600 px-4">Get personalized feedback on how well your resume matches specific job requirements</p>
        </div>
      </div>

      {!ratingResult ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Job Title *
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                rows={4}
                value={formData.jobDescription}
                onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Paste the complete job description including requirements, responsibilities, and qualifications..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Resume Content *
              </label>
              <textarea
                rows={6}
                value={formData.resumeText}
                onChange={(e) => handleInputChange('resumeText', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Paste your complete resume content including experience, skills, education, and achievements..."
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={analyzeResume}
                disabled={!isFormValid || isAnalyzing}
                className="px-6 lg:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-2 text-sm lg:text-base"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Resume...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    <span>Analyze My Resume</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Resume Analysis Results</h2>
              <div className={`inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 px-4 lg:px-6 py-4 rounded-2xl ${getScoreBgColor(ratingResult.overallScore)}`}>
                <div className="text-center">
                  <div className={`text-3xl lg:text-4xl font-bold ${getScoreColor(ratingResult.overallScore)}`}>
                    {ratingResult.overallScore}
                  </div>
                  <div className="text-sm text-gray-600">Overall Score</div>
                </div>
                <div className="text-center">
                  {renderStars(ratingResult.overallScore)}
                  <div className="text-sm text-gray-600 mt-1">Rating</div>
                </div>
                <div className="text-center">
                  <div className={`text-xl lg:text-2xl font-bold ${getScoreColor(ratingResult.matchPercentage)}`}>
                    {ratingResult.matchPercentage}%
                  </div>
                  <div className="text-sm text-gray-600">Job Match</div>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-8">
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              Strengths
            </h3>
            <div className="space-y-3">
              {ratingResult.strengths.map((strength, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm lg:text-base text-gray-700">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Match */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-8">
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Target className="w-6 h-6 text-blue-600 mr-2" />
              Skills Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">Matching Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {ratingResult.skillsMatch.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3">Missing Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {ratingResult.missingSkills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-8">
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-2" />
              Areas for Improvement
            </h3>
            <div className="space-y-3">
              {ratingResult.weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm lg:text-base text-gray-700">{weakness}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-8">
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
              Improvement Suggestions
            </h3>
            <div className="space-y-3">
              {ratingResult.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm lg:text-base text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => {
                setRatingResult(null);
                setFormData({ jobTitle: '', jobDescription: '', resumeText: '' });
              }}
              className="px-4 py-2 lg:px-6 lg:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm lg:text-base"
            >
              Analyze Another Resume
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all text-sm lg:text-base"
            >
              Back to Job Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeRating;