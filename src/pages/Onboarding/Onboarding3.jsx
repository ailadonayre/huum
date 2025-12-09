import { Bell } from 'lucide-react';
import Button from '../../components/Button/Button';
import IconCircle from '../../components/IconCircle/IconCircle';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import './Onboarding.css';

const Onboarding3 = ({ onNext, onSkip }) => {
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
            <Bell strokeWidth={2} />
          </IconCircle>
        </div>

        <div className="onboarding-text">
          <h1 className="onboarding-title">
            And translates them into{' '}
            <span className="highlight">visuals, vibrations,</span> or{' '}
            <span className="highlight">gentle alerts</span>
          </h1>
          <p className="onboarding-description">
            Experience your environment through gentle cues designed for you
          </p>
        </div>
      </div>

      <div className="onboarding-footer">
        <ProgressIndicator total={3} current={2} />
        <div className="onboarding-actions">
          <Button variant="primary" fullWidth onClick={onNext}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding3;