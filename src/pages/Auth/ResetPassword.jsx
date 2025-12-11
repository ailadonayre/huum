import { CheckCircle, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import logoWhite from '../../assets/icons/huum logo-white.png';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import './Auth.css';

const ResetPassword = ({ onBack, onReset }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validatePassword = (pwd) => {
    const errors = {};
    
    if (pwd.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!/(?=.*[a-z])/.test(pwd)) {
      errors.password = 'Password must contain at least one lowercase letter';
    }
    
    if (!/(?=.*[A-Z])/.test(pwd)) {
      errors.password = 'Password must contain at least one uppercase letter';
    }
    
    if (!/(?=.*\d)/.test(pwd)) {
      errors.password = 'Password must contain at least one number';
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validatePassword(password);
    
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setShowSuccess(true);
    
    // Show success message then redirect
    setTimeout(() => {
      console.log('Password reset successful');
      onReset();
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="auth-screen">
        <div className="auth-header">
          <div className="auth-header-spacer"></div>
          <img src={logoWhite} alt="huum" className="auth-logo" />
          <div className="auth-header-spacer"></div>
        </div>

        <div className="auth-content">
          <div className="reset-success-content">
            <div className="reset-success-icon">
              <CheckCircle size={80} />
            </div>
            <h1 className="auth-title">Password Reset!</h1>
            <p className="auth-subtitle">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-screen">
      <div className="auth-header">
        <button className="auth-back-button" onClick={onBack} aria-label="Go back">
          <ChevronLeft size={24} />
        </button>
        <img src={logoWhite} alt="huum" className="auth-logo" />
        <div className="auth-header-spacer"></div>
      </div>

      <div className="auth-content">
        <h1 className="auth-title">Reset Password</h1>
        <p className="auth-subtitle">
          Create a new password for your account
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <InputField
              label="New Password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: '' });
              }}
              error={errors.password}
              required
            />
          </div>

          <div className="auth-form-group">
            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors({ ...errors, confirmPassword: '' });
              }}
              error={errors.confirmPassword}
              required
            />
          </div>

          <div className="password-requirements">
            <p className="password-requirements-title">Password must contain:</p>
            <ul className="password-requirements-list">
              <li className={password.length >= 8 ? 'valid' : ''}>
                At least 8 characters
              </li>
              <li className={/(?=.*[a-z])/.test(password) ? 'valid' : ''}>
                One lowercase letter
              </li>
              <li className={/(?=.*[A-Z])/.test(password) ? 'valid' : ''}>
                One uppercase letter
              </li>
              <li className={/(?=.*\d)/.test(password) ? 'valid' : ''}>
                One number
              </li>
            </ul>
          </div>

          <Button 
            type="submit" 
            variant="purple" 
            fullWidth 
            className="auth-submit-button"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;