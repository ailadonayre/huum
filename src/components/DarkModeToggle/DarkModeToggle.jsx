import { Moon, Sun } from 'lucide-react';
import './DarkModeToggle.css';

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button 
      className="dark-mode-toggle-floating" 
      onClick={onToggle}
      aria-label={isDarkMode ? "Light mode" : "Dark mode"}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default DarkModeToggle;