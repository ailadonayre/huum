import './ProgressIndicator.css';

const ProgressIndicator = ({ total = 3, current = 1 }) => {
  return (
    <div className="progress-indicator">
      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          className={`progress-dot ${index === current ? 'active' : ''} ${
            index < current ? 'completed' : ''
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;