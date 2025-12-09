import { Activity, Home, Library, Lightbulb, Settings } from 'lucide-react';
import './BottomNav.css';

const BottomNav = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'activity', icon: Activity, label: 'Activity' },
    { id: 'learn', icon: Lightbulb, label: 'Learn' },
    { id: 'library', icon: Library, label: 'Library' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      {navItems.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          className={`bottom-nav-item ${activeTab === id ? 'active' : ''}`}
          onClick={() => onTabChange(id)}
          aria-label={label}
          aria-current={activeTab === id ? 'page' : undefined}
        >
          <Icon className="bottom-nav-icon" strokeWidth={2} />
          <span className="bottom-nav-label">{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;