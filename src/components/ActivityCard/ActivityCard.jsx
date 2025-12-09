import { Home as HomeIcon, MessageCircle, Music, Volume2 } from 'lucide-react';
import './ActivityCard.css';

const ActivityCard = ({ activity }) => {
  const { category, title, time, color = 'green' } = activity;

  const getIcon = () => {
    switch (category.toLowerCase()) {
      case 'music':
        return <Music strokeWidth={2} />;
      case 'conversation':
        return <MessageCircle strokeWidth={2} />;
      case 'doorbell':
        return <HomeIcon strokeWidth={2} />;
      case 'alarm':
        return <Volume2 strokeWidth={2} />;
      default:
        return <Volume2 strokeWidth={2} />;
    }
  };

  return (
    <div className="activity-card">
      <div className={`activity-icon activity-icon-${color}`}>
        {getIcon()}
      </div>
      <div className="activity-content">
        <h3 className="activity-title">{title}</h3>
        <p className="activity-time">{time}</p>
      </div>
      <button className="activity-more" aria-label="More options">
        <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
          <circle cx="2" cy="2" r="2" fill="currentColor" />
          <circle cx="2" cy="8" r="2" fill="currentColor" />
          <circle cx="2" cy="14" r="2" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
};

export default ActivityCard;