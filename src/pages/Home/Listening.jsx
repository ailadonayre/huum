import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import logoWhite from '../../assets/icons/huum logo-white.png';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import BottomNav from '../../components/BottomNav/BottomNav';
import { generateWaveformData } from '../../utils/animationHelpers';
import './Home.css';
import './Listening.css';

const Listening = ({ onNavigate, detectedSounds, onToggleListening, isDarkMode, onToggleDarkMode, visualIntensity = 5 }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [waveformData, setWaveformData] = useState(generateWaveformData(7));
  const [currentSound, setCurrentSound] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveformData(generateWaveformData(7));
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (detectedSounds.length > 0) {
      const latest = detectedSounds[0];
      setCurrentSound(latest);
      
      const timeout = setTimeout(() => {
        setCurrentSound(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [detectedSounds]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

  const recentActivities = detectedSounds.slice(0, 5);
  const intensityScale = visualIntensity / 5;

  return (
    <div className="home-screen listening-screen">
      <div className="home-header">
        <img src={logoWhite} alt="huum" className="home-logo" />
        <button 
          className="home-moon-button" 
          onClick={onToggleDarkMode}
          aria-label={isDarkMode ? "Light mode" : "Dark mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="home-content">
        <div className="home-status-badge listening-badge">
          <span className="status-dot listening-dot"></span>
          <span>Listening...</span>
        </div>

        {currentSound && (
          <div className="sound-detection-alert" style={{ opacity: intensityScale }}>
            <div className="sound-alert-icon" style={{
              background: currentSound.categoryColor === 'pink' ? 'var(--gradient-pink)' :
                         currentSound.categoryColor === 'orange' ? 'var(--gradient-orange)' :
                         currentSound.categoryColor === 'green' ? 'var(--gradient-green)' :
                         'var(--gradient-purple)'
            }}>
              <span className="sound-alert-emoji">
                {currentSound.category === 'Conversation' ? '🗣️' :
                 currentSound.category === 'Music' ? '🎵' :
                 currentSound.category === 'Doorbell' ? '🔔' :
                 currentSound.category === 'Phone call' ? '📞' :
                 '🚗'}
              </span>
            </div>
            <p className="sound-alert-text">{currentSound.category} detected</p>
          </div>
        )}

        <div className="listening-circle-wrapper" onClick={onToggleListening}>
          <div className="listening-circle">
            <div className="listening-circle-bg active"></div>
            <div className="listening-circle-bg active"></div>
            <div className="listening-circle-bg active"></div>
            <button className="listening-circle-inner listening-active">
              <div className="waveform-container">
                {waveformData.map((height, index) => (
                  <div
                    key={index}
                    className="waveform-bar"
                    style={{
                      height: `${height * 40 * intensityScale}px`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>

        <h1 className="home-title">Listening...</h1>
        <p className="home-description">
          Monitoring your environment for important sounds
        </p>

        {recentActivities.length > 0 && (
          <div className="recent-activity">
            <div className="recent-activity-header">
              <h2 className="recent-activity-title">Recent Detections</h2>
              <span className="see-all-link" onClick={() => onNavigate('activity')}>
                See all
              </span>
            </div>
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <ActivityCard 
                  key={activity.id} 
                  activity={{
                    category: activity.category,
                    title: activity.category,
                    time: activity.time,
                    color: activity.categoryColor
                  }} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Listening;