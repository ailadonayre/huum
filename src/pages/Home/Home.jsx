import { Ear, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import logoWhite from '../../assets/icons/huum logo-white.png';
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

  const recentActivities = detectedSounds.slice(0, 3);

  return (
    <div className="home-screen">
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
        <div className="home-status-badge">
          <span className="status-dot"></span>
          <span>Not listening</span>
        </div>

        <div className="listening-circle-wrapper" onClick={onToggleListening}>
          <div className="listening-circle">
            <div className="listening-circle-bg"></div>
            <div className="listening-circle-bg"></div>
            <div className="listening-circle-bg"></div>
            <button className={`listening-circle-inner ${pulseAnimation ? 'pulse' : ''}`}>
              <Ear strokeWidth={2} />
            </button>
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