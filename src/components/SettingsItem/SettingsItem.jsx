import { ChevronRight } from 'lucide-react';
import './SettingsItem.css';

const SettingsItem = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick, 
  showArrow = true,
  toggle = false,
  toggleValue = false,
  onToggleChange,
  color = 'purple'
}) => {
  const handleClick = () => {
    if (toggle && onToggleChange) {
      onToggleChange(!toggleValue);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="settings-item" onClick={handleClick}>
      <div 
        className="settings-item-icon"
        style={{
          background: color === 'purple' ? 'var(--gradient-purple)' :
                     color === 'pink' ? 'var(--gradient-pink)' :
                     color === 'orange' ? 'var(--gradient-orange)' :
                     'var(--gradient-green)'
        }}
      >
        <Icon strokeWidth={2} />
      </div>
      <div className="settings-item-content">
        <h3 className="settings-item-title">{title}</h3>
        {description && (
          <p className="settings-item-description">{description}</p>
        )}
      </div>
      {toggle ? (
        <div className="settings-item-toggle">
          <input
            type="checkbox"
            checked={toggleValue}
            onChange={(e) => {
              e.stopPropagation();
              onToggleChange(e.target.checked);
            }}
            className="settings-toggle-input"
            id={`toggle-${title.replace(/\s+/g, '-')}`}
          />
          <label 
            htmlFor={`toggle-${title.replace(/\s+/g, '-')}`}
            className="settings-toggle-label"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="settings-toggle-slider"></span>
          </label>
        </div>
      ) : showArrow ? (
        <ChevronRight className="settings-item-arrow" size={20} />
      ) : null}
    </div>
  );
};

export default SettingsItem;