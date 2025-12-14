import { Moon, Sun } from 'lucide-react';
import './DarkModeToggle.css';

const DarkModeToggle = ({ isDarkMode, onToggle, variant }) => {
  const classes = `dark-mode-toggle-floating${variant === 'purple' ? ' purple' : ''}`;

  const handleClick = () => {
    if (typeof onToggle === 'function') {
      onToggle();
      return;
    }

    // fallback: toggle data-theme on document
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  };

  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : (document.documentElement.getAttribute('data-theme') === 'dark');

  return (
    <button 
      className={classes} 
      onClick={handleClick}
      aria-label={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default DarkModeToggle;