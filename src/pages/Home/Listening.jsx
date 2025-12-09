import { Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import logoWhite from '../../assets/icons/huum logo-white.png';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import BottomNav from '../../components/BottomNav/BottomNav';
import { generateWaveformData } from '../../utils/animationHelpers';
import './Home.css';

const Listening = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [waveformData, setWaveformData] = useState(generateWaveformData(5));

  useEffect(() => {
    // Animate waveform
    const interval = setInterval(() => {
      setWaveformData(generateWaveformData(5));
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

  // Sample recent activities
  const recentActivities = [
    {
      id: 1,
      category: 'Music',
      title: 'Music',
      description: 'Detected 2 mins ago',
      color: 'green',
      time: '2 mins ago',
    },
    {
      id: 2,
      category: 'Conversation',
      title: 'Conversation',
      description: 'Detected 5 mins ago',
      color: 'pink',
      time: '5 mins ago',
    },
  ];

  return (
    <div className="home-screen">
      <div className="home-header">
        <img src={logoWhite} alt="huum" className="home-logo" />
        <button className="home-moon-button" aria-label="Dark mode">
          <Moon size={20} />
        </button>
      </div>

      <div className="home-content">
        <div className="home-status-badge">
          <span className="status-dot"></span>
          <span>Listening...</span>
        </div>

        <div className="listening-circle-wrapper">
          <div className="listening-circle">
            <div className="listening-circle-bg"></div>
            <div className="listening-circle-bg"></div>
            <div className="listening-circle-bg"></div>
            <div className="listening-circle-inner">
              <div className="waveform-container">
                {waveformData.map((height, index) => (
                  <div
                    key={index}
                    className="waveform-bar"
                    style={{
                      height: `${height * 40}px`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <h1 className="home-title">Listening...</h1>
        <p className="home-description">
          Monitoring your environment for important sounds
        </p>

        <div className="recent-activity">
          <div className="recent-activity-header">
            <h2 className="recent-activity-title">Recent Activity</h2>
            <span className="see-all-link">See all</span>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Listening;