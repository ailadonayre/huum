import { Home as HomeIcon, MessageCircle, Music, Volume2 } from 'lucide-react';
import './ActivityCard.css';

const ActivityCard = ({ activity, isLatest = false }) => {
  const { category, title, time, color = 'green', timestamp } = activity;

  const getIcon = () => {
    switch (category.toLowerCase()) {
      case 'music':
        return <Music strokeWidth={2} />;
      case 'conversation':
        return <MessageCircle strokeWidth={2} />;
      case 'doorbell':
        return <HomeIcon strokeWidth={2} />;
      case 'alarm':
      case 'phone call':
        return <Volume2 strokeWidth={2} />;
      default:
        return <Volume2 strokeWidth={2} />;
    }
  };

  const getTimeAgo = () => {
    if (!timestamp) return time;
    
    const now = new Date();
    const then = new Date(timestamp);
    const seconds = Math.floor((now - then) / 1000);
    
    if (seconds < 10) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return time;
  };

  const cardClass = `activity-card ${isLatest ? `activity-card-latest activity-card-latest-${color}` : ''}`;

  return (
    <div className={cardClass}>
      <div className={`activity-icon activity-icon-${color} ${isLatest ? 'activity-icon-latest' : ''}`}>
        {getIcon()}
      </div>
      <div className="activity-content">
        <h3 className={`activity-title ${isLatest ? 'activity-title-latest' : ''}`}>{title}</h3>
        <p className={`activity-time ${isLatest ? 'activity-time-latest' : ''}`}>{getTimeAgo()}</p>
      </div>
      <button className={`activity-more ${isLatest ? 'activity-more-latest' : ''}`} aria-label="More options">
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