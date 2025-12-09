import { AudioWaveform } from 'lucide-react';
import Button from '../../components/Button/Button';
import IconCircle from '../../components/IconCircle/IconCircle';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import './Onboarding.css';

const Onboarding2 = ({ onNext, onSkip }) => {
  return (
    <div className="onboarding-screen">
      <div className="onboarding-header">
        <button className="skip-button" onClick={onSkip}>
          Skip
        </button>
      </div>

      <div className="onboarding-content">
        <div className="onboarding-icon-wrapper">
          <IconCircle size="large" delay={200}>
            <AudioWaveform strokeWidth={2} />
          </IconCircle>
        </div>

        <div className="onboarding-text">
          <h1 className="onboarding-title">
            It identifies <span className="highlight">critical sounds</span> around you
          </h1>
          <p className="onboarding-description">
            From doorbells to alarms, huum recognizes what matters
          </p>
        </div>
      </div>

      <div className="onboarding-footer">
        <ProgressIndicator total={3} current={1} />
        <div className="onboarding-actions">
          <Button variant="primary" fullWidth onClick={onNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding2;