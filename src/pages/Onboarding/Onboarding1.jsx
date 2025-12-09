import { Ear } from 'lucide-react';
import Button from '../../components/Button/Button';
import IconCircle from '../../components/IconCircle/IconCircle';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import './Onboarding.css';

const Onboarding1 = ({ onNext, onSkip }) => {
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
            <Ear strokeWidth={2} />
          </IconCircle>
        </div>

        <div className="onboarding-text">
          <h1 className="onboarding-title">
            huum <span className="highlight">listens to your surroundings</span>
          </h1>
          <p className="onboarding-description">
            Our app continuously monitors the sounds around you
          </p>
        </div>
      </div>

      <div className="onboarding-footer">
        <ProgressIndicator total={3} current={0} />
        <div className="onboarding-actions">
          <Button variant="primary" fullWidth onClick={onNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding1;