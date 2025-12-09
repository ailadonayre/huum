import './IconCircle.css';

const IconCircle = ({ children, size = 'large', delay = 0 }) => {
  return (
    <div 
      className={`icon-circle icon-circle-${size}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="icon-circle-outer">
        <div className="icon-circle-middle">
          <div className="icon-circle-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconCircle;