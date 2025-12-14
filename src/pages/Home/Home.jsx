import { Ear, Pause } from 'lucide-react';
import { useEffect, useState } from 'react';
import logoPurple from '../../assets/icons/huum logo-purple.png';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import BottomNav from '../../components/BottomNav/BottomNav';
import './Home.css';

const Home = ({ onNavigate, onToggleListening, isDarkMode, onToggleDarkMode, detectedSounds }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return '';
    
    const now = new Date();
    const then = new Date(timestamp);
    const seconds = Math.floor((now - then) / 1000);
    
    if (seconds < 10) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return 'yesterday';
  };

  const recentActivities = detectedSounds.slice(0, 3);

  return (
    <div className="home-screen">
      
      <div className="home-header-new">
        <img src={logoPurple} alt="huum" className="home-logo-new" />
      </div>

      <div className="home-content">
        <div className="listening-card" onClick={onToggleListening}>
          <div className="listening-card-header">
            <span className="listening-card-title">Listening...</span>
            <button className="listening-card-pause" aria-label="Pause listening">
              <Pause />
            </button>
          </div>

          <div className="listening-card-body">
            <div className="listening-circle">
              <div className="listening-circle-bg active" />
              <button className={`listening-circle-inner ${pulseAnimation ? 'pulse' : ''}`}>
                <Ear strokeWidth={2} />
              </button>
            </div>

            {recentActivities.length > 0 && (
              <div className="listening-detection">
                <div className="listening-detection-icon" style={{ background: recentActivities[0].categoryColor === 'pink' ? 'var(--gradient-pink)' : recentActivities[0].categoryColor === 'orange' ? 'var(--gradient-orange)' : recentActivities[0].categoryColor === 'green' ? 'var(--gradient-green)' : 'var(--gradient-purple)'}}>
                  <Ear />
                </div>
                <div className="listening-detection-content">
                  <div className="listening-detection-title">{recentActivities[0].category}</div>
                  <div className="listening-detection-sub">{recentActivities[0].time}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <h1 className="home-title">Ready to Listen</h1>
        <p className="home-description">
          Tap the button above to start monitoring your surroundings
        </p>

        {recentActivities.length > 0 && (
          <div className="recent-activity">
            <div className="recent-activity-header">
              <h2 className="recent-activity-title">Recent Activity</h2>
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
                    time: getTimeAgo(activity.timestamp),
                    color: activity.categoryColor,
                    timestamp: activity.timestamp
                  }}
                  isLatest={index === 0}
                />
              ))}
            </div>
          </div>
        )}

        {recentActivities.length === 0 && (
          <div className="home-empty-state">
            <div className="home-empty-icon">
              <Ear size={32} />
            </div>
            <p className="home-empty-text">
              No sounds detected yet. Start listening to see activity here.
            </p>
          </div>
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Home;