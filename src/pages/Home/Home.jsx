import { Ear, Moon } from 'lucide-react';
import { useState } from 'react';
import logoWhite from '../../assets/icons/huum logo-white.png';
import BottomNav from '../../components/BottomNav/BottomNav';
import './Home.css';

const Home = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

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
          <span>Not listening</span>
        </div>

        <div className="listening-circle-wrapper">
          <div className="listening-circle">
            <div className="listening-circle-bg"></div>
            <div className="listening-circle-bg"></div>
            <div className="listening-circle-bg"></div>
            <div className="listening-circle-inner">
              <Ear strokeWidth={2} />
            </div>
          </div>
        </div>

        <h1 className="home-title">huum</h1>
        <p className="home-description">
          Tap the button below to start listening to your surroundings
        </p>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Home;