import {
    Activity as ActivityIcon,
    AlertCircle,
    Car,
    Filter,
    Home as HomeIcon,
    MessageCircle,
    Music,
    Phone
} from 'lucide-react';
import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import './Activity.css';

const Activity = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('activity');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: null },
    { id: 'people', label: 'People and Communication', color: 'pink', icon: MessageCircle },
    { id: 'doorbell', label: 'Doorbell', color: 'orange', icon: HomeIcon },
    { id: 'ambient', label: 'Ambient', color: 'green', icon: Music },
    { id: 'traffic', label: 'Traffic', color: 'purple', icon: Car },
  ];

  const activities = [
    {
      id: 1,
      category: 'Conversation',
      categoryColor: 'pink',
      icon: MessageCircle,
      time: '10:23 AM',
      description: 'People and Communication',
      tags: ['Indoor', 'Low Volume'],
      badge: '🗣️',
      date: 'Today',
    },
    {
      id: 2,
      category: 'Music',
      categoryColor: 'green',
      icon: Music,
      time: '10:15 AM',
      description: 'Ambient',
      tags: ['Music', 'Background'],
      badge: '🎵',
      date: 'Today',
    },
    {
      id: 3,
      category: 'Doorbell',
      categoryColor: 'orange',
      icon: HomeIcon,
      time: '09:45 AM',
      description: 'Doorbell',
      tags: ['Alert', 'Outdoor'],
      badge: '🔔',
      date: 'Today',
    },
    {
      id: 4,
      category: 'Phone call',
      categoryColor: 'pink',
      icon: Phone,
      time: '09:30 AM',
      description: 'People and Communication',
      tags: ['Phone', 'Indoor'],
      badge: '📞',
      date: 'Today',
    },
    {
      id: 5,
      category: 'Car horn',
      categoryColor: 'purple',
      icon: Car,
      time: 'Yesterday, 6:12 PM',
      description: 'Traffic',
      tags: ['Outdoor', 'Loud'],
      badge: '🚗',
      date: 'Yesterday',
    },
    {
      id: 6,
      category: 'Fire alarm',
      categoryColor: 'orange',
      icon: AlertCircle,
      time: 'Yesterday, 2:30 PM',
      description: 'Oven timer',
      tags: ['Alert', 'Indoor', 'High Volume'],
      badge: '⏰',
      date: 'Yesterday',
    },
    {
      id: 7,
      category: 'Knocking',
      categoryColor: 'orange',
      icon: HomeIcon,
      time: 'Yesterday, 11:20 AM',
      description: 'Doorbell',
      tags: ['Alert', 'Indoor'],
      badge: '🚪',
      date: 'Yesterday',
    },
  ];

  const filteredActivities = selectedCategory === 'all' 
    ? activities 
    : activities.filter(activity => {
        if (selectedCategory === 'people') return activity.categoryColor === 'pink';
        if (selectedCategory === 'doorbell') return activity.category.toLowerCase().includes('doorbell') || activity.category.toLowerCase().includes('knocking');
        if (selectedCategory === 'ambient') return activity.categoryColor === 'green';
        if (selectedCategory === 'traffic') return activity.categoryColor === 'purple' || activity.category.toLowerCase().includes('car');
        return true;
      });

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = activity.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {});

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

  const getCategoryIcon = (icon) => {
    const Icon = icon;
    return <Icon strokeWidth={2} />;
  };

  return (
    <div className="activity-screen">
      <div className="activity-header">
        <div className="activity-header-top">
          <h1 className="activity-title">Activity</h1>
          <button className="activity-filter-button" aria-label="Filter activities">
            <Filter />
            <span>Filter</span>
          </button>
        </div>

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
              Start listening to see detected sounds appear here
            </p>
          </div>
        ) : (
          Object.entries(groupedActivities).map(([date, items]) => (
            <div key={date} className="activity-date-section">
              <div className="activity-date-header">
                <h2 className="activity-date-title">{date}</h2>
                <div className="activity-date-line"></div>
              </div>
              
              <div className="activity-items">
                {items.map((activity, index) => (
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
                        {getCategoryIcon(activity.icon)}
                      </div>
                      <div className="activity-card-badge">
                        {activity.badge}
                      </div>
                    </div>

                    <div className="activity-card-details">
                      <div className="activity-card-header">
                        <h3 className="activity-card-category">{activity.category}</h3>
                        <span className="activity-card-time">{activity.time}</span>
                      </div>
                      <p className="activity-card-description">{activity.description}</p>
                      <div className="activity-card-tags">
                        {activity.tags.map((tag, idx) => (
                          <span key={idx} className="activity-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
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