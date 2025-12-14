import { useEffect, useState } from 'react';
import logoPurpleText from '../../assets/icons/huum logo-purple-text.png';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import BottomNav from '../../components/BottomNav/BottomNav';
import { generateWaveformData } from '../../utils/animationHelpers';
import './Home.css';
import './Listening.css';

const Listening = ({ onNavigate, detectedSounds, onToggleListening, isDarkMode, onToggleDarkMode, visualIntensity = 3 }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [waveformData, setWaveformData] = useState(generateWaveformData(7));

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveformData(generateWaveformData(7));
    }, 150);

    return () => clearInterval(interval);
  }, []);


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

  const recentActivities = detectedSounds.slice(0, 5);
  const intensityScale = visualIntensity / 5;

  return (
    <div className="home-screen">
      
      <div className="home-header-new">
        <img src={logoPurpleText} alt="huum" className="home-logo-new" />
      </div>

      <div className="home-content">
        <div className="home-status-badge listening-badge">
          <span className="status-dot listening-dot"></span>
          <span>Listening...</span>
        </div>


        <div className="listening-circle-wrapper" onClick={onToggleListening}>
          <div className="listening-circle">
            <div className="listening-circle-bg active" />
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
              {recentActivities.map((activity, index) => (
                <ActivityCard 
                  key={activity.id} 
                  activity={{
                    category: activity.category,
                    title: activity.category,
                    time: activity.time,
                    color: activity.categoryColor,
                    timestamp: activity.timestamp
                  }}
                  isLatest={index === 0}
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