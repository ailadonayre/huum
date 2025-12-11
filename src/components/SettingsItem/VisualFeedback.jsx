import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import './VisualFeedback.css';

const VisualFeedback = ({ onBack }) => {
  const [intensity, setIntensity] = useState(5);

  const intensityLabels = ['Subtle', '', '', '', '', 'Medium', '', '', '', '', 'Strong'];

  return (
    <div className="visual-feedback-screen">
      <div className="visual-feedback-header">
        <button 
          className="visual-feedback-back" 
          onClick={onBack}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="visual-feedback-title">Visual Feedback</h1>
      </div>

      <div className="visual-feedback-content">
        <div className="visual-feedback-card">
          {/* Intensity Level */}
          <div className="visual-feedback-section">
            <h2 className="visual-feedback-section-title">Intensity Level</h2>
            <p className="visual-feedback-section-description">
              Adjust how prominent visual alerts appear on your screen
            </p>
            
            <div className="visual-feedback-slider-wrapper">
              <div className="visual-feedback-slider-label">
                <span>Intensity</span>
                <span className="visual-feedback-slider-value">
                  {intensityLabels[intensity] || intensity}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="visual-feedback-slider"
                aria-label="Visual feedback intensity"
              />
              <div className="visual-feedback-slider-indicators">
                <span>Subtle</span>
                <span>Strong</span>
              </div>
            </div>
          </div>

          {/* High Contrast Patterns */}
          <div className="visual-feedback-section">
            <h2 className="visual-feedback-section-title">
              High-contrast patterns
            </h2>
            <p className="visual-feedback-section-description">
              Use bold, high-contrast colors for better visibility of visual alerts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualFeedback;