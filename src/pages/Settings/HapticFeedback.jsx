import { ChevronLeft, Vibrate } from 'lucide-react';
import './HapticFeedback.css';

const HapticFeedback = ({ onBack, intensity, onIntensityChange }) => {
  const intensityLabels = ['Off', 'Very Light', 'Light', 'Medium', 'Strong', 'Very Strong'];

  return (
    <div className="haptic-feedback-screen">
      <div className="haptic-feedback-header">
        <button 
          className="haptic-feedback-back" 
          onClick={onBack}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="haptic-feedback-title">Haptic Feedback</h1>
        <div className="haptic-feedback-spacer"></div>
      </div>

      <div className="haptic-feedback-content">
        <div className="haptic-feedback-card">
          <div className="haptic-feedback-icon-wrapper">
            <div className="haptic-feedback-icon">
              <Vibrate size={40} />
            </div>
          </div>

          <div className="haptic-feedback-section">
            <h2 className="haptic-feedback-section-title">Vibration Strength</h2>
            <p className="haptic-feedback-section-description">
              Control the intensity of haptic alerts when sounds are detected
            </p>
            
            <div className="haptic-feedback-slider-wrapper">
              <div className="haptic-feedback-slider-label">
                <span>Intensity</span>
                <span className="haptic-feedback-slider-value">
                  {intensityLabels[intensity]}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={intensity}
                onChange={(e) => onIntensityChange(parseInt(e.target.value))}
                className="haptic-feedback-slider"
                aria-label="Haptic feedback intensity"
              />
              <div className="haptic-feedback-slider-indicators">
                <span>Gentle</span>
                <span>Strong</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HapticFeedback;