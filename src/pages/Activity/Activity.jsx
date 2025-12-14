import {
  Activity as ActivityIcon,
  AlertCircle,
  Bell,
  Car,
  Home as HomeIcon,
  MessageCircle,
  Music,
  Phone,
  TrendingUp
} from 'lucide-react';
import { useMemo, useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import './Activity.css';

const Activity = ({ onNavigate, detectedSounds }) => {
  const [activeTab, setActiveTab] = useState('activity');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: null },
    { id: 'people', label: 'People', color: 'pink', icon: MessageCircle },
    { id: 'safety', label: 'Safety', color: 'orange', icon: Bell },
    { id: 'ambient', label: 'Ambient', color: 'green', icon: Music },
    { id: 'alerts', label: 'Alerts', color: 'purple', icon: AlertCircle },
  ];

  const filteredActivities = useMemo(() => {
    if (selectedCategory === 'all') return detectedSounds;
    
    return detectedSounds.filter(activity => {
      if (selectedCategory === 'people') return activity.categoryColor === 'pink';
      if (selectedCategory === 'safety') return activity.categoryColor === 'orange';
      if (selectedCategory === 'ambient') return activity.categoryColor === 'green';
      if (selectedCategory === 'alerts') return activity.categoryColor === 'purple';
      return true;
    });
  }, [detectedSounds, selectedCategory]);

  const groupedActivities = useMemo(() => {
    const groups = {};
    
    filteredActivities.forEach(activity => {
      const date = new Date(activity.timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      let dateLabel;
      if (date.toDateString() === today.toDateString()) {
        dateLabel = 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateLabel = 'Yesterday';
      } else {
        dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      
      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }
      groups[dateLabel].push(activity);
    });
    
    return groups;
  }, [filteredActivities]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

  const getIconComponent = (category) => {
    switch (category) {
      case 'Conversation':
        return MessageCircle;
      case 'Music':
        return Music;
      case 'Doorbell':
        return HomeIcon;
      case 'Phone call':
        return Phone;
      case 'Car horn':
        return Car;
      default:
        return Bell;
    }
  };

  const activityStats = useMemo(() => {
    const total = detectedSounds.length;
    const todayCount = detectedSounds.filter(s => {
      const date = new Date(s.timestamp);
      const today = new Date();
      return date.toDateString() === today.toDateString();
    }).length;
    
    return { total, today: todayCount };
  }, [detectedSounds]);

  return (
    <div className="activity-screen">
      <div className="activity-header">
        <div className="activity-header-top">
          <div>
            <h1 className="activity-title">Activity</h1>
            <p className="activity-subtitle">{activityStats.total} sounds detected</p>
          </div>
        </div>

        {activityStats.today > 0 && (
          <div className="activity-stats">
            <div className="activity-stat-card">
              <div className="activity-stat-icon">
                <TrendingUp size={20} />
              </div>
              <div className="activity-stat-content">
                <p className="activity-stat-value">{activityStats.today}</p>
                <p className="activity-stat-label">Today</p>
              </div>
            </div>
          </div>
        )}

        <div className="activity-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`activity-tab ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.color && (
                <span 
                  className="activity-tab-icon"
                  style={{
                    background: category.color === 'pink' ? 'var(--gradient-pink)' :
                               category.color === 'orange' ? 'var(--gradient-orange)' :
                               category.color === 'green' ? 'var(--gradient-green)' :
                               'var(--gradient-purple)'
                  }}
                />
              )}
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="activity-content">
        {filteredActivities.length === 0 ? (
          <div className="activity-empty">
            <div className="activity-empty-icon">
              <ActivityIcon />
            </div>
            <h2 className="activity-empty-title">No activities yet</h2>
            <p className="activity-empty-description">
              {selectedCategory === 'all' 
                ? "Start listening to see detected sounds appear here"
                : `No ${selectedCategory} sounds detected yet`}
            </p>
          </div>
        ) : (
          Object.entries(groupedActivities).map(([date, items]) => (
            <div key={date} className="activity-date-section">
              <div className="activity-date-header">
                <h2 className="activity-date-title">{date}</h2>
                <span className="activity-date-count">{items.length}</span>
              </div>
              
              <div className="activity-items">
                {items.map((activity, index) => {
                  const IconComponent = getIconComponent(activity.category);
                  return (
                    <div 
                      key={activity.id} 
                      className="activity-card-detailed"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="activity-card-icon-wrapper">
                        <div 
                          className="activity-card-icon-large"
                          style={{
                            background: activity.categoryColor === 'pink' ? 'var(--gradient-pink)' :
                                       activity.categoryColor === 'orange' ? 'var(--gradient-orange)' :
                                       activity.categoryColor === 'green' ? 'var(--gradient-green)' :
                                       'var(--gradient-purple)'
                          }}
                        >
                          <IconComponent strokeWidth={2} />
                        </div>
                        <div className="activity-card-pulse"></div>
                      </div>

                      <div className="activity-card-details">
                        <div className="activity-card-header">
                          <h3 className="activity-card-category">{activity.category}</h3>
                          <span className="activity-card-time">{activity.time}</span>
                        </div>
                        <p className="activity-card-description">{activity.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Activity;