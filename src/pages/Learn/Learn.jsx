import {
    Lightbulb,
    MessageCircle,
    MoreVertical,
    Music,
    Plus,
    Volume2
} from 'lucide-react';
import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import './Learn.css';

const Learn = ({ onNavigate, onCreateCategory }) => {
  const [activeTab, setActiveTab] = useState('learn');

  const categories = [
    {
      id: 1,
      name: 'Safety',
      color: 'orange',
      icon: Volume2,
      soundCount: 4,
      sounds: ['Fire alarm', 'Car horn', 'Oven timer', 'Glass break'],
    },
    {
      id: 2,
      name: 'People and Communication',
      color: 'pink',
      icon: MessageCircle,
      soundCount: 3,
      sounds: ['Conversation', 'Phone call', 'Doorbell'],
    },
    {
      id: 3,
      name: 'Ambient',
      color: 'green',
      icon: Music,
      soundCount: 5,
      sounds: ['Music', 'Traffic', 'Rain', 'Birds', 'Wind'],
    },
    {
      id: 4,
      name: 'Notification/Alert',
      color: 'purple',
      icon: Volume2,
      soundCount: 2,
      sounds: ['Text notification', 'Email alert'],
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

  const getGradient = (color) => {
    switch (color) {
      case 'pink':
        return 'var(--gradient-pink)';
      case 'orange':
        return 'var(--gradient-orange)';
      case 'green':
        return 'var(--gradient-green)';
      case 'purple':
        return 'var(--gradient-purple)';
      default:
        return 'var(--gradient-purple)';
    }
  };

  return (
    <div className="learn-screen">
      <div className="learn-header">
        <h1 className="learn-title">Learn</h1>
        <p className="learn-subtitle">
          Teach huum to recognize sounds in your environment
        </p>
      </div>

      <div className="learn-content">
        {/* Create New Category Card */}
        <div 
          className="learn-create-card"
          onClick={onCreateCategory}
        >
          <div className="learn-create-icon">
            <Plus />
          </div>
          <h2 className="learn-create-title">Create a new category</h2>
          <p className="learn-create-description">
            Group sounds together to help huum learn what matters to you
          </p>
        </div>

        {/* Categories Section */}
        <div className="learn-categories-section">
          <div className="learn-section-header">
            <h2 className="learn-section-title">Your Categories</h2>
            <span className="learn-section-count">{categories.length}</span>
          </div>

          {categories.length === 0 ? (
            <div className="learn-empty">
              <div className="learn-empty-icon">
                <Lightbulb />
              </div>
              <h3 className="learn-empty-title">No categories yet</h3>
              <p className="learn-empty-description">
                Create your first category to start teaching huum about the sounds in your environment
              </p>
            </div>
          ) : (
            <div className="learn-categories-grid">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div 
                    key={category.id} 
                    className="learn-category-card"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="learn-category-header">
                      <div 
                        className="learn-category-icon-wrapper"
                        style={{ background: getGradient(category.color) }}
                      >
                        <Icon strokeWidth={2} />
                      </div>
                      <button 
                        className="learn-category-menu"
                        aria-label="Category options"
                      >
                        <MoreVertical size={20} />
                      </button>
                    </div>

                    <h3 className="learn-category-name">{category.name}</h3>
                    <p className="learn-category-sounds">
                      {category.soundCount} {category.soundCount === 1 ? 'sound' : 'sounds'}
                    </p>

                    <div className="learn-category-items">
                      {category.sounds.slice(0, 3).map((sound, idx) => (
                        <span key={idx} className="learn-category-item">
                          {sound}
                        </span>
                      ))}
                      {category.sounds.length > 3 && (
                        <span className="learn-category-item">
                          +{category.sounds.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Learn;