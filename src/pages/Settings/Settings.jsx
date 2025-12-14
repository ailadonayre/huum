// src/pages/Settings/Settings.jsx
import {
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Eye,
  HelpCircle,
  Info,
  LogOut,
  Shield,
  Vibrate
} from 'lucide-react';
import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import DarkModeToggle from '../../components/DarkModeToggle/DarkModeToggle';
import './Settings.css';

const Settings = ({ 
  onNavigate, 
  onSettingClick, 
  isDarkMode, 
  onToggleDarkMode, 
  onLogout,
  visualIntensity,
  onVisualIntensityChange,
  highContrast,
  onHighContrastChange,
  hapticIntensity,
  onHapticIntensityChange,
  notificationSettings,
  onNotificationSettingsChange
}) => {
  const [activeTab, setActiveTab] = useState('settings');
  const [expandedSection, setExpandedSection] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const intensityLabels = ['Off', 'Very Low', 'Low', 'Medium', 'High', 'Very High'];

  return (
    <div className="settings-screen-purple">
      <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
      
      <div className="settings-header-purple">
        <h1 className="settings-title-purple">Settings</h1>
      </div>

      <div className="settings-content-purple">
        <div className="settings-account-purple" onClick={() => onSettingClick('edit-profile')}>
          <div className="settings-account-avatar-purple">
            JD
          </div>
          <div className="settings-account-info-purple">
            <h2 className="settings-account-name-purple">John Doe</h2>
            <p className="settings-account-email-purple">john.doe@example.com</p>
          </div>
          <ChevronRight className="settings-account-arrow-purple" size={20} />
        </div>

        <div className="settings-section-purple">
          <h3 className="settings-section-title-purple">Feedback</h3>
          <div className="settings-items-purple">
            {/* Visual Feedback */}
            <div className="settings-expandable-card">
              <div 
                className="settings-card-header"
                onClick={() => toggleSection('visual')}
              >
                <div className="settings-card-icon-wrapper" style={{ background: 'var(--gradient-purple)' }}>
                  <Eye size={20} />
                </div>
                <div className="settings-card-content">
                  <h4 className="settings-card-title">Visual Feedback</h4>
                  <p className="settings-card-description">Customize visual cues</p>
                </div>
                {expandedSection === 'visual' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSection === 'visual' && (
                <div className="settings-card-expanded">
                  <div className="settings-slider-section">
                    <div className="settings-slider-header">
                      <span className="settings-slider-label">Intensity Level</span>
                      <span className="settings-slider-value">{intensityLabels[visualIntensity]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={visualIntensity}
                      onChange={(e) => onVisualIntensityChange(parseInt(e.target.value))}
                      className="settings-slider"
                    />
                    <div className="settings-slider-labels">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                  
                  <div className="settings-toggle-row">
                    <div>
                      <p className="settings-toggle-title">High-contrast patterns</p>
                      <p className="settings-toggle-description">Suitable for color-blindness</p>
                    </div>
                    <div className="settings-toggle">
                      <input
                        type="checkbox"
                        checked={highContrast}
                        onChange={(e) => onHighContrastChange(e.target.checked)}
                        className="settings-toggle-input"
                        id="high-contrast"
                      />
                      <label htmlFor="high-contrast" className="settings-toggle-label">
                        <span className="settings-toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Haptic Feedback */}
            <div className="settings-expandable-card">
              <div 
                className="settings-card-header"
                onClick={() => toggleSection('haptic')}
              >
                <div className="settings-card-icon-wrapper" style={{ background: 'var(--gradient-purple)' }}>
                  <Vibrate size={20} />
                </div>
                <div className="settings-card-content">
                  <h4 className="settings-card-title">Haptic Feedback</h4>
                  <p className="settings-card-description">Control vibration alerts</p>
                </div>
                {expandedSection === 'haptic' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSection === 'haptic' && (
                <div className="settings-card-expanded">
                  <div className="settings-slider-section">
                    <div className="settings-slider-header">
                      <span className="settings-slider-label">Vibration Strength</span>
                      <span className="settings-slider-value">{intensityLabels[hapticIntensity]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={hapticIntensity}
                      onChange={(e) => onHapticIntensityChange(parseInt(e.target.value))}
                      className="settings-slider"
                    />
                    <div className="settings-slider-labels">
                      <span>Gentle</span>
                      <span>Strong</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="settings-expandable-card">
              <div 
                className="settings-card-header"
                onClick={() => toggleSection('notifications')}
              >
                <div className="settings-card-icon-wrapper" style={{ background: 'var(--gradient-purple)' }}>
                  <Bell size={20} />
                </div>
                <div className="settings-card-content">
                  <h4 className="settings-card-title">Notifications</h4>
                  <p className="settings-card-description">Choose sounds to track</p>
                </div>
                {expandedSection === 'notifications' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSection === 'notifications' && (
                <div className="settings-card-expanded">
                  <div className="settings-notification-item">
                    <div>
                      <p className="settings-toggle-title">Safety</p>
                      <p className="settings-toggle-description">Fire alarms, doorbells, alarms</p>
                    </div>
                    <div className="settings-toggle">
                      <input
                        type="checkbox"
                        checked={notificationSettings.safety}
                        onChange={(e) => onNotificationSettingsChange({
                          ...notificationSettings,
                          safety: e.target.checked
                        })}
                        className="settings-toggle-input"
                        id="notif-safety"
                      />
                      <label htmlFor="notif-safety" className="settings-toggle-label">
                        <span className="settings-toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="settings-notification-item">
                    <div>
                      <p className="settings-toggle-title">People and Communication</p>
                      <p className="settings-toggle-description">Conversations, phone calls</p>
                    </div>
                    <div className="settings-toggle">
                      <input
                        type="checkbox"
                        checked={notificationSettings.people}
                        onChange={(e) => onNotificationSettingsChange({
                          ...notificationSettings,
                          people: e.target.checked
                        })}
                        className="settings-toggle-input"
                        id="notif-people"
                      />
                      <label htmlFor="notif-people" className="settings-toggle-label">
                        <span className="settings-toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="settings-notification-item">
                    <div>
                      <p className="settings-toggle-title">Ambient</p>
                      <p className="settings-toggle-description">Music, traffic, nature sounds</p>
                    </div>
                    <div className="settings-toggle">
                      <input
                        type="checkbox"
                        checked={notificationSettings.ambient}
                        onChange={(e) => onNotificationSettingsChange({
                          ...notificationSettings,
                          ambient: e.target.checked
                        })}
                        className="settings-toggle-input"
                        id="notif-ambient"
                      />
                      <label htmlFor="notif-ambient" className="settings-toggle-label">
                        <span className="settings-toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="settings-section-purple">
          <h3 className="settings-section-title-purple">More</h3>
          <div className="settings-items-purple">
            <div className="settings-expandable-card">
              <div 
                className="settings-card-header"
                onClick={() => {/* handle navigation */}}
              >
                <div className="settings-card-icon-wrapper" style={{ background: 'var(--gradient-green)' }}>
                  <Info size={20} />
                </div>
                <div className="settings-card-content">
                  <h4 className="settings-card-title">About huum</h4>
                  <p className="settings-card-description">Learn more about the app</p>
                </div>
                <ChevronRight size={20} color="var(--color-gray)" />
              </div>
            </div>

            <div className="settings-expandable-card">
              <div 
                className="settings-card-header"
                onClick={() => {/* handle navigation */}}
              >
                <div className="settings-card-icon-wrapper" style={{ background: 'var(--gradient-orange)' }}>
                  <Shield size={20} />
                </div>
                <div className="settings-card-content">
                  <h4 className="settings-card-title">Privacy and Permissions</h4>
                  <p className="settings-card-description">Control your privacy settings</p>
                </div>
                <ChevronRight size={20} color="var(--color-gray)" />
              </div>
            </div>

            <div className="settings-expandable-card">
              <div 
                className="settings-card-header"
                onClick={() => {/* handle navigation */}}
              >
                <div className="settings-card-icon-wrapper" style={{ background: 'var(--gradient-purple)' }}>
                  <HelpCircle size={20} />
                </div>
                <div className="settings-card-content">
                  <h4 className="settings-card-title">Help and Support</h4>
                  <p className="settings-card-description">Get help or contact us</p>
                </div>
                <ChevronRight size={20} color="var(--color-gray)" />
              </div>
            </div>
          </div>
        </div>

        <button className="settings-signout-purple" onClick={onLogout}>
          <LogOut />
          <span>Sign Out</span>
        </button>

        <p className="settings-version-purple">Version 1.0.0</p>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Settings;