import {
    Bell,
    ChevronRight,
    Eye,
    HelpCircle,
    Info,
    LogOut,
    Shield,
    User,
    Vibrate
} from 'lucide-react';
import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import SettingsItem from '../../components/SettingsItem/SettingsItem';
import './Settings.css';

const Settings = ({ onNavigate, onSettingClick }) => {
  const [activeTab, setActiveTab] = useState('settings');
  const [visualFeedback, setVisualFeedback] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

  const handleSignOut = () => {
    console.log('Signing out...');
    // Handle sign out logic
  };

  return (
    <div className="settings-screen">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
      </div>

      <div className="settings-content">
        {/* Account Section */}
        <div className="settings-account">
          <div className="settings-account-avatar">
            JD
          </div>
          <div className="settings-account-info">
            <h2 className="settings-account-name">John Doe</h2>
            <p className="settings-account-email">john.doe@example.com</p>
          </div>
          <ChevronRight className="settings-account-arrow" size={20} />
        </div>

        {/* Feedback Settings */}
        <div className="settings-section">
          <h3 className="settings-section-title">Feedback</h3>
          <div className="settings-items">
            <SettingsItem
              icon={Eye}
              title="Visual Feedback"
              description="Show visual alerts for detected sounds"
              toggle={true}
              toggleValue={visualFeedback}
              onToggleChange={setVisualFeedback}
              color="purple"
            />
            <SettingsItem
              icon={Vibrate}
              title="Haptic Feedback"
              description="Vibrate when sounds are detected"
              toggle={true}
              toggleValue={hapticFeedback}
              onToggleChange={setHapticFeedback}
              color="purple"
            />
            <SettingsItem
              icon={Bell}
              title="Notifications"
              description="Receive push notifications"
              toggle={true}
              toggleValue={notifications}
              onToggleChange={setNotifications}
              color="purple"
            />
          </div>
        </div>

        {/* Account Settings */}
        <div className="settings-section">
          <h3 className="settings-section-title">Account</h3>
          <div className="settings-items">
            <SettingsItem
              icon={User}
              title="Profile"
              description="Manage your account details"
              onClick={() => console.log('Profile clicked')}
              color="pink"
            />
            <SettingsItem
              icon={Shield}
              title="Privacy and Permissions"
              description="Control your privacy settings"
              onClick={() => console.log('Privacy clicked')}
              color="orange"
            />
          </div>
        </div>

        {/* More Settings */}
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

        {/* Sign Out Button */}
        <button className="settings-signout" onClick={handleSignOut}>
          <LogOut />
          <span>Sign Out</span>
        </button>

        {/* Version */}
        <div className="settings-version">
          Version 1.0.0
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Settings;