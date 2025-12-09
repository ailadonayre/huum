import { useEffect, useState } from 'react';
import logoWhite from '../../assets/icons/huum logo-white.png';
import './SplashScreen.css';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className={`splash-logo-container ${isVisible ? 'visible' : ''}`}>
          <img 
            src={logoWhite} 
            alt="huum logo" 
            className="splash-logo"
          />
        </div>
        
        {/* Animated ripple circles behind logo */}
        <div className="splash-ripple splash-ripple-1"></div>
        <div className="splash-ripple splash-ripple-2"></div>
        <div className="splash-ripple splash-ripple-3"></div>
      </div>
    </div>
  );
};

export default SplashScreen;