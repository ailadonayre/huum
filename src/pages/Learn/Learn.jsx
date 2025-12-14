import {
  BookOpen,
  Brain,
  Lightbulb,
  MessageCircle,
  MoreVertical,
  Music,
  Plus,
  Sparkles,
  Volume2
} from 'lucide-react';
import { useState } from 'react';
import logoPurpleText from '../../assets/icons/huum logo-purple-text.png';
import BottomNav from '../../components/BottomNav/BottomNav';
import './Learn.css';

const Learn = ({ onNavigate, onCreateCategory, detectedSounds }) => {
  const [activeTab, setActiveTab] = useState('learn');

  const categories = [
    {
      id: 1,
      name: 'Safety',
      color: 'orange',
      icon: Volume2,
      soundCount: 4,
      sounds: ['Fire alarm', 'Car horn', 'Oven timer', 'Glass break'],
      learned: 87,
    },
    {
      id: 2,
      name: 'People and Communication',
      color: 'pink',
      icon: MessageCircle,
      soundCount: 3,
      sounds: ['Conversation', 'Phone call', 'Doorbell'],
      learned: 92,
    },
    {
      id: 3,
      name: 'Ambient',
      color: 'green',
      icon: Music,
      soundCount: 5,
      sounds: ['Music', 'Traffic', 'Rain', 'Birds', 'Wind'],
      learned: 78,
    },
    {
      id: 4,
      name: 'Notification/Alert',
      color: 'purple',
      icon: Volume2,
      soundCount: 2,
      sounds: ['Text notification', 'Email alert'],
      learned: 95,
    },
  ];

  const recentLearning = detectedSounds.slice(0, 3);
  const totalSounds = categories.reduce((sum, cat) => sum + cat.soundCount, 0);

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
      <div className="learn-header-new">
        <img src={logoPurpleText} alt="huum" className="learn-logo-new" />
        <div className="learn-stats-pills">
          <div className="learn-stat-pill">
            <BookOpen size={14} />
            <span>{totalSounds}</span>
          </div>
          <div className="learn-stat-pill">
            <Sparkles size={14} />
            <span>{categories.length}</span>
          </div>
        </div>
      </div>

      <div className="learn-content">
        <div 
          className="learn-create-card"
          onClick={onCreateCategory}
        >
          <div className="learn-create-icon">
            <Plus />
          </div>
          <div className="learn-create-content">
            <h2 className="learn-create-title">Create a new category</h2>
            <p className="learn-create-description">
              Group sounds to help huum learn what matters to you
            </p>
          </div>
        </div>

        {recentLearning.length > 0 && (
          <div className="learn-recent-section">
            <h3 className="learn-section-title">
              <Lightbulb size={18} />
              Recently Detected
            </h3>
            <div className="learn-recent-items">
              {recentLearning.map((sound, index) => (
                <div 
                  key={sound.id} 
                  className="learn-recent-item"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div 
                    className="learn-recent-dot"
                    style={{
                      background: sound.categoryColor === 'pink' ? 'var(--gradient-pink)' :
                                 sound.categoryColor === 'orange' ? 'var(--gradient-orange)' :
                                 sound.categoryColor === 'green' ? 'var(--gradient-green)' :
                                 'var(--gradient-purple)'
                    }}
                  />
                  <span className="learn-recent-text">{sound.category}</span>
                  <span className="learn-recent-time">{sound.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="learn-categories-section">
          <div className="learn-section-header">
            <h2 className="learn-section-title-main">
              <Brain size={20} />
              Your Categories
            </h2>
            <span className="learn-section-count">{categories.length}</span>
          </div>

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

                  <div className="learn-category-progress">
                    <div className="learn-progress-bar">
                      <div 
                        className="learn-progress-fill"
                        style={{ 
                          width: `${category.learned}%`,
                          background: getGradient(category.color)
                        }}
                      />
                    </div>
                    <span className="learn-progress-text">{category.learned}% learned</span>
                  </div>

                  <div className="learn-category-items">
                    {category.sounds.slice(0, 2).map((sound, idx) => (
                      <span key={idx} className="learn-category-item">
                        {sound}
                      </span>
                    ))}
                    {category.sounds.length > 2 && (
                      <span className="learn-category-item learn-category-more">
                        +{category.sounds.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Learn;