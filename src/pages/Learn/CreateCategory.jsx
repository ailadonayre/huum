import {
    Bell,
    ChevronLeft,
    Coffee,
    Heart,
    Home as HomeIcon,
    MessageCircle,
    Music,
    Volume2,
    Zap
} from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import './CreateCategory.css';

const CreateCategory = ({ onBack, onCreate }) => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState('purple');
  const [selectedIcon, setSelectedIcon] = useState('music');

  const colors = [
    { id: 'purple', gradient: 'var(--gradient-purple)' },
    { id: 'pink', gradient: 'var(--gradient-pink)' },
    { id: 'orange', gradient: 'var(--gradient-orange)' },
    { id: 'green', gradient: 'var(--gradient-green)' },
  ];

  const icons = [
    { id: 'music', icon: Music },
    { id: 'message', icon: MessageCircle },
    { id: 'home', icon: HomeIcon },
    { id: 'volume', icon: Volume2 },
    { id: 'bell', icon: Bell },
    { id: 'heart', icon: Heart },
    { id: 'zap', icon: Zap },
    { id: 'coffee', icon: Coffee },
  ];

  const handleCreate = () => {
    if (categoryName.trim()) {
      console.log('Creating category:', {
        name: categoryName,
        color: selectedColor,
        icon: selectedIcon,
      });
      onCreate();
    }
  };

  return (
    <div className="create-category-screen">
      <div className="create-category-header">
        <button 
          className="create-category-back" 
          onClick={onBack}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="create-category-title">Add a new sound</h1>
        <button 
          className="create-category-cancel"
          onClick={onBack}
        >
          Cancel
        </button>
      </div>

      <div className="create-category-content">
        <div className="create-category-form">
          {/* Category Name */}
          <div className="create-category-form-group">
            <label className="create-category-label">Category Name</label>
            <input
              type="text"
              className="create-category-input"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              autoFocus
            />
          </div>

          {/* Color Selection */}
          <div className="create-category-form-group">
            <label className="create-category-label">Color</label>
            <div className="create-category-colors">
              {colors.map((color) => (
                <button
                  key={color.id}
                  className={`create-category-color ${selectedColor === color.id ? 'selected' : ''}`}
                  style={{ background: color.gradient }}
                  onClick={() => setSelectedColor(color.id)}
                  aria-label={`Select ${color.id} color`}
                />
              ))}
            </div>
          </div>

          {/* Icon Selection */}
          <div className="create-category-form-group">
            <label className="create-category-label">Icon</label>
            <div className="create-category-icons">
              {icons.map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  className={`create-category-icon ${selectedIcon === id ? 'selected' : ''}`}
                  onClick={() => setSelectedIcon(id)}
                  aria-label={`Select ${id} icon`}
                >
                  <Icon strokeWidth={2} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="create-category-footer">
        <div className="create-category-actions">
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
            onClick={handleCreate}
            disabled={!categoryName.trim()}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;