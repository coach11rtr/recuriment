import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TrendingUp, DollarSign, Star, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface SalaryBenchmarkProps {
  jobTitle: string;
  location: string;
  salary: string;
  jobType: string;
  requirements: string;
  onRatingReceived?: (rating: SalaryRating) => void;
}

interface SalaryRating {
  score: number;
  feedback: string;
  marketRange: string;
  recommendation: string;
}

const SalaryBenchmark: React.FC<SalaryBenchmarkProps> = ({
  jobTitle,
  location,
  salary,
  jobType,
  requirements,
  onRatingReceived
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [rating, setRating] = useState<SalaryRating | null>(null);
  const [error, setError] = useState<string | null>(null);

  const genAI = new GoogleGenerativeAI('AIzaSyBkhJ-6KZBBMUl2pgvYVP9QwSmB7N99Oic');

  const analyzeSalary = async () => {
    if (!salary || !jobTitle) {
      setError('Job title and salary are required for analysis');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const prompt = `
        Analyze the following job posting and rate the salary competitiveness out of 10:

        Job Title: ${jobTitle}
        Location: ${location || 'Not specified'}
        Job Type: ${jobType}
        Salary Offered: ${salary}
        Requirements: ${requirements || 'Standard requirements'}

        Please provide a comprehensive salary analysis and return ONLY valid JSON in this exact format:
        {
          "score": number (1-10),
          "feedback": "Brief explanation of the rating",
          "marketRange": "Typical market range for this role",
          "recommendation": "Specific recommendation for improvement or validation"
        }

        Consider factors like:
        - Market standards for this role and location
        - Experience level requirements
        - Industry standards
        - Cost of living in the location
        - Job type (full-time, contract, etc.)
        
        Rate 1-3 as below market, 4-6 as average, 7-8 as competitive, 9-10 as excellent.
      `;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const salaryRating = JSON.parse(jsonMatch[0]);
        setRating(salaryRating);
        onRatingReceived?.(salaryRating);
      } else {
        throw new Error('Invalid response format');
      }

    } catch (error) {
      console.error('Error analyzing salary:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('503') && errorMessage.includes('overloaded')) {
        setError('The AI service is currently busy. Please try again in a few moments.');
      } else {
        setError('Failed to analyze salary. Please try again.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return 'bg-green-100';
    if (score >= 6) return 'bg-yellow-100';
    if (score >= 4) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Competitive';
    if (score >= 4) return 'Average';
    return 'Below Market';
  };

  const renderStars = (score: number) => {
    const stars = Math.round(score / 2); // Convert to 5-star scale
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Salary Benchmark</h3>
        </div>
        
        {!rating && (
          <button
            onClick={analyzeSalary}
            disabled={isAnalyzing || !salary || !jobTitle}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2 text-sm"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <DollarSign className="w-4 h-4" />
                <span>Analyze Salary</span>
              </>
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {!rating && !error && !isAnalyzing && (
        <div className="text-center py-6">
          <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">Get AI-powered salary insights</p>
          <p className="text-sm text-gray-500">Analyze how competitive your salary offer is in the current market</p>
        </div>
      )}

      {rating && (
        <div className="space-y-4">
          {/* Score Display */}
          <div className={`p-4 rounded-lg ${getScoreBgColor(rating.score)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`text-2xl font-bold ${getScoreColor(rating.score)}`}>
                  {rating.score}/10
                </div>
                <div>
                  <div className={`text-sm font-medium ${getScoreColor(rating.score)}`}>
                    {getScoreLabel(rating.score)}
                  </div>
                  {renderStars(rating.score)}
                </div>
              </div>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>

          {/* Feedback */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Analysis</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{rating.feedback}</p>
          </div>

          {/* Market Range */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Market Range</h4>
            <p className="text-sm text-gray-600">{rating.marketRange}</p>
          </div>

          {/* Recommendation */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Recommendation</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{rating.recommendation}</p>
          </div>

          {/* Re-analyze Button */}
          <div className="pt-2 border-t border-gray-200">
            <button
              onClick={() => {
                setRating(null);
                setError(null);
              }}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              Analyze Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryBenchmark;