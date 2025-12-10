import {
    Check,
    ChevronLeft,
    MessageCircle,
    Music,
    Volume2,
    X
} from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import './AddSound.css';

const AddSound = ({ onBack, onRecord }) => {
  const [soundName, setSoundName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: 'Safety',
      color: 'orange',
      icon: Volume2,
      soundCount: 4,
    },
    {
      id: 2,
      name: 'People and Communication',
      color: 'pink',
      icon: MessageCircle,
      soundCount: 3,
    },
    {
      id: 3,
      name: 'Ambient',
      color: 'green',
      icon: Music,
      soundCount: 5,
    },
    {
      id: 4,
      name: 'Notification/Alert',
      color: 'purple',
      icon: Volume2,
      soundCount: 2,
    },
  ];

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

  const handleContinue = () => {
    if (soundName.trim() && selectedCategory) {
      console.log('Sound info:', {
        name: soundName,
        category: selectedCategory,
      });
      onRecord();
    }
  };

  return (
    <div className="add-sound-screen">
      <div className="add-sound-header">
        <button 
          className="add-sound-back" 
          onClick={onBack}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="add-sound-title">Add a new sound</h1>
        <button 
          className="add-sound-close"
          onClick={onBack}
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>

      <div className="add-sound-content">
        <div className="add-sound-form">
          {/* Sound Name */}
          <div className="add-sound-form-group">
            <label className="add-sound-label">Sound Name</label>
            <input
              type="text"
              className="add-sound-input"
              placeholder="e.g., Doorbell, Phone ring"
              value={soundName}
              onChange={(e) => setSoundName(e.target.value)}
              autoFocus
            />
          </div>

          {/* Category Selection */}
          <div className="add-sound-form-group">
            <label className="add-sound-label">Category</label>
            <div className="add-sound-categories">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    className={`add-sound-category-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div 
                      className="add-sound-category-icon"
                      style={{ background: getGradient(category.color) }}
                    >
                      <Icon strokeWidth={2} />
                    </div>
                    <div className="add-sound-category-info">
                      <div className="add-sound-category-name">{category.name}</div>
                      <div className="add-sound-category-count">
                        {category.soundCount} sounds
                      </div>
                    </div>
                    <div className="add-sound-category-check">
                      <Check />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="add-sound-footer">
        <div className="add-sound-actions">
          <Button 
            variant="secondary" 
            fullWidth
            onClick={onBack}
          >
            Cancel
          </Button>
          <Button 
            variant="purple" 
            fullWidth
            onClick={handleContinue}
            disabled={!soundName.trim() || !selectedCategory}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSound;