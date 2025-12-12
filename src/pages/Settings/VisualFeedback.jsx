import { ChevronLeft, Eye } from 'lucide-react';
import { useState } from 'react';
import './VisualFeedback.css';

const VisualFeedback = ({ onBack, intensity, onIntensityChange }) => {
  const [highContrast, setHighContrast] = useState(false);
  const intensityLabels = ['Off', 'Very Subtle', 'Subtle', 'Medium', 'Strong', 'Very Strong'];

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
        <div className="visual-feedback-spacer"></div>
      </div>

      <div className="visual-feedback-content">
        <div className="visual-feedback-card">
          <div className="visual-feedback-icon-wrapper">
            <div className="visual-feedback-icon">
              <Eye size={40} />
            </div>
          </div>

          <div className="visual-feedback-section">
            <h2 className="visual-feedback-section-title">Intensity Level</h2>
            <p className="visual-feedback-section-description">
              How prominent visual cues appear
            </p>
            
            <div className="visual-feedback-slider-wrapper">
              <div className="visual-feedback-slider-label">
                <span>Intensity</span>
                <span className="visual-feedback-slider-value">
                  {intensityLabels[intensity]}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={intensity}
                onChange={(e) => onIntensityChange(parseInt(e.target.value))}
                className="visual-feedback-slider"
                aria-label="Visual feedback intensity"
              />
              <div className="visual-feedback-slider-indicators">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>

          <div className="visual-feedback-section">
            <div className="visual-feedback-toggle-row">
              <div>
                <h2 className="visual-feedback-section-title">High-contrast patterns</h2>
                <p className="visual-feedback-section-description">
                  Suitable for color-blindness
                </p>
              </div>
              <div className="visual-feedback-toggle">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="visual-feedback-toggle-input"
                  id="high-contrast-toggle"
                />
                <label 
                  htmlFor="high-contrast-toggle"
                  className="visual-feedback-toggle-label"
                >
                  <span className="visual-feedback-toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualFeedback;