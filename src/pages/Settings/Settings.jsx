// src/pages/Settings/Settings.jsx - Add DarkModeToggle
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