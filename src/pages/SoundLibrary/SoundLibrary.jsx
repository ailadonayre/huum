import {
  Calendar,
  Clock,
  Home as HomeIcon,
  Library as LibraryIcon,
  MessageCircle,
  MoreVertical,
  Music,
  Plus,
  Search,
  Sparkles,
  Volume2
} from 'lucide-react';
import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import './SoundLibrary.css';

const SoundLibrary = ({ onNavigate, onAddSound }) => {
  const [activeTab, setActiveTab] = useState('library');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Sounds', color: null },
    { id: 'safety', label: 'Safety', color: 'orange' },
    { id: 'people', label: 'People', color: 'pink' },
    { id: 'ambient', label: 'Ambient', color: 'green' },
    { id: 'notification', label: 'Alerts', color: 'purple' },
  ];

  const sounds = [
    {
      id: 1,
      name: 'Traffic',
      category: 'Ambient',
      categoryColor: 'green',
      icon: Music,
      duration: '0:45',
      date: 'Dec 8, 2024',
      quality: 95,
    },
    {
      id: 2,
      name: 'Neighborhood cat',
      category: 'Ambient',
      categoryColor: 'green',
      icon: Music,
      duration: '1:20',
      date: 'Dec 7, 2024',
      quality: 88,
    },
    {
      id: 3,
      name: 'Conversation',
      category: 'People and Communication',
      categoryColor: 'pink',
      icon: MessageCircle,
      duration: '2:15',
      date: 'Dec 7, 2024',
      quality: 92,
    },
    {
      id: 4,
      name: 'Doorbell',
      category: 'Safety',
      categoryColor: 'orange',
      icon: HomeIcon,
      duration: '0:05',
      date: 'Dec 6, 2024',
      quality: 98,
    },
    {
      id: 5,
      name: 'Phone call',
      category: 'People and Communication',
      categoryColor: 'pink',
      icon: MessageCircle,
      duration: '0:30',
      date: 'Dec 6, 2024',
      quality: 94,
    },
    {
      id: 6,
      name: 'Car horn',
      category: 'Ambient',
      categoryColor: 'green',
      icon: Music,
      duration: '0:03',
      date: 'Dec 5, 2024',
      quality: 90,
    },
    {
      id: 7,
      name: 'Fire alarm',
      category: 'Safety',
      categoryColor: 'orange',
      icon: Volume2,
      duration: '0:10',
      date: 'Dec 5, 2024',
      quality: 100,
    },
    {
      id: 8,
      name: 'Oven timer',
      category: 'Safety',
      categoryColor: 'orange',
      icon: Volume2,
      duration: '0:08',
      date: 'Dec 4, 2024',
      quality: 96,
    },
  ];

  const filteredSounds = sounds.filter(sound => {
    const matchesCategory = selectedCategory === 'all' || 
      sound.category.toLowerCase().includes(categories.find(c => c.id === selectedCategory)?.label.toLowerCase() || '');
    const matchesSearch = sound.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sound.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  const totalSounds = sounds.length;
  const avgQuality = Math.round(sounds.reduce((sum, s) => sum + s.quality, 0) / sounds.length);

  return (
    <div className="sound-library-screen">
      <div className="sound-library-header">
        <div className="sound-library-header-top">
          <div>
            <h1 className="sound-library-title">Sound Library</h1>
            <p className="sound-library-subtitle">{totalSounds} sounds recorded</p>
          </div>
          <button 
            className="sound-library-add-button"
            onClick={onAddSound}
          >
            <Plus />
          </button>
        </div>

        <div className="sound-library-stats">
          <div className="sound-library-stat-card">
            <div className="sound-library-stat-icon">
              <LibraryIcon size={18} />
            </div>
            <div className="sound-library-stat-content">
              <p className="sound-library-stat-value">{totalSounds}</p>
              <p className="sound-library-stat-label">Total</p>
            </div>
          </div>
          
          <div className="sound-library-stat-card">
            <div className="sound-library-stat-icon">
              <Sparkles size={18} />
            </div>
            <div className="sound-library-stat-content">
              <p className="sound-library-stat-value">{avgQuality}%</p>
              <p className="sound-library-stat-label">Quality</p>
            </div>
          </div>
        </div>

        <div className="sound-library-search">
          <Search className="sound-library-search-icon" size={20} />
          <input
            type="text"
            className="sound-library-search-input"
            placeholder="Search sounds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="sound-library-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`sound-library-tab ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.color && (
                <span 
                  className="sound-library-tab-dot"
                  style={{ background: getGradient(category.color) }}
                />
              )}
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sound-library-content">
        {filteredSounds.length === 0 ? (
          <div className="sound-library-empty">
            <div className="sound-library-empty-icon">
              <LibraryIcon />
            </div>
            <h2 className="sound-library-empty-title">No sounds found</h2>
            <p className="sound-library-empty-description">
              {searchQuery 
                ? `No sounds match "${searchQuery}"`
                : 'Start adding sounds to build your library'}
            </p>
            <button 
              className="sound-library-add-button-large"
              onClick={onAddSound}
            >
              <Plus />
              <span>Add your first sound</span>
            </button>
          </div>
        ) : (
          <div className="sound-library-grid">
            {filteredSounds.map((sound, index) => {
              const Icon = sound.icon;
              return (
                <div 
                  key={sound.id} 
                  className="sound-card"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="sound-card-header">
                    <div 
                      className="sound-card-icon"
                      style={{ background: getGradient(sound.categoryColor) }}
                    >
                      <Icon strokeWidth={2} />
                    </div>
                    <button 
                      className="sound-card-menu"
                      aria-label="Sound options"
                    >
                      <MoreVertical size={20} />
                    </button>
                  </div>

                  <h3 className="sound-card-name">{sound.name}</h3>
                  <p className="sound-card-category">{sound.category}</p>

                  <div className="sound-card-quality">
                    <div className="sound-quality-bar">
                      <div 
                        className="sound-quality-fill"
                        style={{ 
                          width: `${sound.quality}%`,
                          background: getGradient(sound.categoryColor)
                        }}
                      />
                    </div>
                    <span className="sound-quality-text">{sound.quality}% quality</span>
                  </div>

                  <div className="sound-card-meta">
                    <div className="sound-card-meta-item">
                      <Clock />
                      <span>{sound.duration}</span>
                    </div>
                    <div className="sound-card-meta-item">
                      <Calendar />
                      <span>{sound.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default SoundLibrary;