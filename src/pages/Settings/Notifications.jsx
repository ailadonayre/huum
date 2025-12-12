import { Bell, ChevronLeft } from 'lucide-react';
import SettingsItem from '../../components/SettingsItem/SettingsItem';
import './Notifications.css';

const Notifications = ({ onBack, settings, onSettingsChange }) => {
  const handleToggle = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="notifications-screen">
      <div className="notifications-header">
        <button 
          className="notifications-back" 
          onClick={onBack}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="notifications-title">Notifications</h1>
        <div className="notifications-spacer"></div>
      </div>

      <div className="notifications-content">
        <div className="notifications-card">
          <div className="notifications-icon-wrapper">
            <div className="notifications-icon">
              <Bell size={40} />
            </div>
          </div>

          <div className="notifications-section">
            <h2 className="notifications-section-title">Sound Categories</h2>
            <p className="notifications-section-description">
              Choose which sounds to track
            </p>
            
            <div className="notifications-items">
              <SettingsItem
                icon={Bell}
                title="Safety"
                description="Fire alarms, doorbells, alarms"
                toggle={true}
                toggleValue={settings.safety}
                onToggleChange={(value) => handleToggle('safety', value)}
                showArrow={false}
                color="orange"
              />
              
              <SettingsItem
                icon={Bell}
                title="People and Communication"
                description="Conversations, phone calls"
                toggle={true}
                toggleValue={settings.people}
                onToggleChange={(value) => handleToggle('people', value)}
                showArrow={false}
                color="pink"
              />
              
              <SettingsItem
                icon={Bell}
                title="Ambient"
                description="Music, traffic, nature sounds"
                toggle={true}
                toggleValue={settings.ambient}
                onToggleChange={(value) => handleToggle('ambient', value)}
                showArrow={false}
                color="green"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;