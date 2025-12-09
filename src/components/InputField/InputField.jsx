import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import './InputField.css';

const InputField = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange,
  error,
  required = false,
  disabled = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="input-field">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className={`input-wrapper ${isFocused ? 'focused' : ''} ${error ? 'error' : ''}`}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className="input"
          aria-label={label}
          aria-invalid={error ? 'true' : 'false'}
        />
        {type === 'password' && (
          <button
            type="button"
            className="input-icon-button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </div>
      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
};

export default InputField;