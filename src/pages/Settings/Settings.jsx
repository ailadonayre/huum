import {
  Bell,
  ChevronRight,
  Eye,
  HelpCircle,
  Info,
  LogOut,
  Shield,
  Vibrate
} from 'lucide-react';
import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import SettingsItem from '../../components/SettingsItem/SettingsItem';
import './Settings.css';

const Settings = ({ onNavigate, onSettingClick, isDarkMode, onToggleDarkMode, onLogout }) => {
  const [activeTab, setActiveTab] = useState('settings');
  const [visualFeedback, setVisualFeedback] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

  return (
    <div className="settings-screen">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
      </div>

      <div className="settings-content">
        <div className="settings-account" onClick={() => onSettingClick('edit-profile')}>
          <div className="settings-account-avatar">
            JD
          </div>
          <div className="settings-account-info">
            <h2 className="settings-account-name">John Doe</h2>
            <p className="settings-account-email">john.doe@example.com</p>
          </div>
          <ChevronRight className="settings-account-arrow" size={20} />
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">Feedback</h3>
          <div className="settings-items">
            <SettingsItem
              icon={Eye}
              title="Visual Feedback"
              description="Customize visual cues"
              onClick={() => onSettingClick('visual-feedback')}
              color="purple"
            />
            <SettingsItem
              icon={Vibrate}
              title="Haptic Feedback"
              description="Control vibration alerts"
              onClick={() => onSettingClick('haptic-feedback')}
              color="purple"
            />
            <SettingsItem
              icon={Bell}
              title="Notifications"
              description="Choose which sounds to track"
              onClick={() => onSettingClick('notifications')}
              color="purple"
            />
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">Account</h3>
          <div className="settings-items">
            <SettingsItem
              icon={Shield}
              title="Privacy and Permissions"
              description="Control your privacy settings"
              onClick={() => console.log('Privacy clicked')}
              color="orange"
            />
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">More</h3>
          <div className="settings-items">
            <SettingsItem
              icon={Info}
              title="About huum"
              description="Learn more about the app"
              onClick={() => console.log('About clicked')}
              color="green"
            />
            <SettingsItem
              icon={HelpCircle}
              title="Help and Support"
              description="Get help or contact us"
              onClick={() => console.log('Help clicked')}
              color="purple"
            />
          </div>
        </div>

        <button className="settings-signout" onClick={onLogout}>
          <LogOut />
          <span>Sign Out</span>
        </button>

        <div className="settings-version">
          Version 1.0.0
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Settings;