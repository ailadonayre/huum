import {
    Bell,
    Coffee,
    Heart,
    Home as HomeIcon,
    MessageCircle,
    Music,
    Palette,
    Volume2,
    Zap
} from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import './CreateCategoryModal.css';

const CreateCategoryModal = ({ isOpen, onClose, onCreate }) => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState('purple');
  const [customColor, setCustomColor] = useState('#8B88F1');
  const [selectedIcon, setSelectedIcon] = useState('music');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colors = [
    { id: 'purple', gradient: 'var(--gradient-purple)' },
    { id: 'pink', gradient: 'var(--gradient-pink)' },
    { id: 'orange', gradient: 'var(--gradient-orange)' },
    { id: 'green', gradient: 'var(--gradient-green)' },
    { id: 'custom', gradient: null }, // Custom color option
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
        color: selectedColor === 'custom' ? customColor : selectedColor,
        icon: selectedIcon,
      });
      setCategoryName('');
      setSelectedColor('purple');
      setCustomColor('#8B88F1');
      setSelectedIcon('music');
      setShowColorPicker(false);
      onCreate();
    }
  };

  const handleClose = () => {
    setCategoryName('');
    setSelectedColor('purple');
    setCustomColor('#8B88F1');
    setSelectedIcon('music');
    setShowColorPicker(false);
    onClose();
  };

  const handleColorSelect = (colorId) => {
    setSelectedColor(colorId);
    if (colorId === 'custom') {
      setShowColorPicker(true);
    } else {
      setShowColorPicker(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create a new category"
      footer={
        <Button 
          variant="purple" 
          fullWidth 
          onClick={handleCreate}
          disabled={!categoryName.trim()}
        >
          Create
        </Button>
      }
    >
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

      <div className="create-category-form-group">
        <label className="create-category-label">Color</label>
        <div className="create-category-colors">
          {colors.map((color) => (
            <button
              key={color.id}
              className={`create-category-color ${selectedColor === color.id ? 'selected' : ''} ${color.id === 'custom' ? 'custom-color-option' : ''}`}
              style={{ 
                background: color.id === 'custom' 
                  ? `linear-gradient(135deg, ${customColor} 0%, ${customColor}dd 100%)`
                  : color.gradient 
              }}
              onClick={() => handleColorSelect(color.id)}
              aria-label={`Select ${color.id} color`}
            >
              {color.id === 'custom' && (
                <Palette className="custom-color-icon" size={20} strokeWidth={2} />
              )}
            </button>
          ))}
        </div>
        
        {showColorPicker && (
          <div className="custom-color-picker">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="color-picker-input"
            />
            <span className="color-picker-label">Pick your color</span>
          </div>
        )}
      </div>

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
    </Modal>
  );
};

export default CreateCategoryModal;