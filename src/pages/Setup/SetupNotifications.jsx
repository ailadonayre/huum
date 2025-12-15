import { Bell } from 'lucide-react';
import Button from '../../components/Button/Button';
import IconCircle from '../../components/IconCircle/IconCircle';
import './Setup.css';

const SetupNotifications = ({ onNext, onBack, onSkip }) => {
  const handleAllow = () => {
    console.log('Notification permission requested');
    // Simulate permission granted
    onNext();
  };

  return (
    <div className="setup-screen">
      <div className="setup-header">
        <div className="setup-progress">
          <div className="setup-progress-bar active"></div>
          <div className="setup-progress-bar active"></div>
        </div>
      </div>

      <div className="setup-content">
        <h1 className="setup-title">
          Allow <br />
          Notifications
        </h1>

        <div className="setup-icon-wrapper">
          <IconCircle size="large" delay={0}>
            <Bell strokeWidth={2} />
          </IconCircle>
        </div>

        <p className="setup-description">
          Get notified when huum detects important sounds so you never miss what matters.
        </p>
      </div>

      <div className="setup-footer">
        <Button variant="primary" fullWidth onClick={handleAllow}>
          Allow notifications
        </Button>
        
        <Button variant="secondary" fullWidth onClick={onSkip}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SetupNotifications;