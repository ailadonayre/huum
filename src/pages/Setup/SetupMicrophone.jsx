import { ChevronLeft, Mic } from 'lucide-react';
import Button from '../../components/Button/Button';
import IconCircle from '../../components/IconCircle/IconCircle';
import './Setup.css';

const SetupMicrophone = ({ onNext, onBack, onSkip, userName = 'User' }) => {
  const handleAllow = () => {
    console.log('Microphone permission requested');
    // Simulate permission granted
    onNext();
  };

  return (
    <div className="setup-screen">
      <div className="setup-header">
        <button className="setup-back-button" onClick={onBack} aria-label="Go back">
          <ChevronLeft size={24} />
        </button>
        <div className="setup-progress">
          <div className="setup-progress-bar active"></div>
          <div className="setup-progress-bar"></div>
        </div>
      </div>

      <div className="setup-content">
        <h2 className="setup-greeting">[{userName}], let's finish setting up huum</h2>
        
        <h1 className="setup-title">
          We need <br />
          microphone access
        </h1>

        <div className="setup-icon-wrapper">
          <IconCircle size="large" delay={0}>
            <Mic strokeWidth={2} />
          </IconCircle>
        </div>

        <p className="setup-description">
          This allows huum to listen to your surroundings and identify important sounds around you.
        </p>
      </div>

      <div className="setup-footer">
        <Button variant="primary" fullWidth onClick={handleAllow}>
          Allow microphone access
        </Button>
        
        <p className="setup-skip-text">
          <span className="setup-skip-link" onClick={onSkip}>
            Skip for now
          </span>
        </p>
      </div>
    </div>
  );
};

export default SetupMicrophone;