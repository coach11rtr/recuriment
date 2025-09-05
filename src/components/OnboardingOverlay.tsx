import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingStep {
  id: string;
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface OnboardingOverlayProps {
  steps: OnboardingStep[];
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingOverlay: React.FC<OnboardingOverlayProps> = ({ steps, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (currentStep < steps.length) {
      const element = document.querySelector(steps[currentStep].target) as HTMLElement;
      if (element) {
        setTargetElement(element);
        
        // Calculate tooltip position
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        let top = 0;
        let left = 0;
        
        switch (steps[currentStep].position) {
          case 'top':
            top = rect.top + scrollTop - 80;
            left = rect.left + scrollLeft + rect.width / 2;
            break;
          case 'bottom':
            top = rect.bottom + scrollTop + 20;
            left = rect.left + scrollLeft + rect.width / 2;
            break;
          case 'left':
            top = rect.top + scrollTop + rect.height / 2;
            left = rect.left + scrollLeft - 320;
            break;
          case 'right':
            top = rect.top + scrollTop + rect.height / 2;
            left = rect.right + scrollLeft + 20;
            break;
        }
        
        setTooltipPosition({ top, left });
        
        // Scroll element into view
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add highlight class
        element.classList.add('onboarding-highlight');
      }
    }
    
    return () => {
      // Remove highlight from all elements
      document.querySelectorAll('.onboarding-highlight').forEach(el => {
        el.classList.remove('onboarding-highlight');
      });
    };
  }, [currentStep, steps]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    document.querySelectorAll('.onboarding-highlight').forEach(el => {
      el.classList.remove('onboarding-highlight');
    });
    onSkip();
  };

  if (currentStep >= steps.length) return null;

  const step = steps[currentStep];

  return (
    <>
      {/* Overlay backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      
      {/* Tooltip */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs sm:max-w-sm"
        style={{
          top: tooltipPosition.top,
          left: Math.max(10, Math.min(tooltipPosition.left - 150, window.innerWidth - 320)),
        }}
      >
        {/* Arrow indicator */}
        <div
          className={`absolute w-3 h-3 bg-white border transform rotate-45 ${
            step.position === 'top' ? 'bottom-[-6px] border-b border-r' :
            step.position === 'bottom' ? 'top-[-6px] border-t border-l' :
            step.position === 'left' ? 'right-[-6px] border-r border-b' :
            'left-[-6px] border-l border-t'
          }`}
          style={{
            left: step.position === 'top' || step.position === 'bottom' ? '50%' : undefined,
            top: step.position === 'left' || step.position === 'right' ? '50%' : undefined,
            transform: step.position === 'top' || step.position === 'bottom' ? 'translateX(-50%) rotate(45deg)' : 
                      'translateY(-50%) rotate(45deg)'
          }}
        />
        
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        {/* Content */}
        <div className="pr-6">
          <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{step.description}</p>
          
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={nextStep}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
              >
                <span>{currentStep === steps.length - 1 ? 'Got it!' : 'Next'}</span>
                {currentStep < steps.length - 1 && <ChevronRight className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-2 left-4 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Skip tour
        </button>
      </div>
      
      {/* Highlight styles */}
      <style jsx global>{`
        .onboarding-highlight {
          position: relative;
          z-index: 45;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 8px rgba(59, 130, 246, 0.2);
          border-radius: 8px;
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default OnboardingOverlay;