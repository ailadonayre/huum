import { ChevronLeft, Mail } from 'lucide-react';
import { useState } from 'react';
import logoWhite from '../../assets/icons/huum logo-white.png';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import './Auth.css';

const ForgotPassword = ({ onBack, onContinue }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    console.log('Password reset email sent to:', email);
    onContinue();
  };

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
        <h1 className="auth-title">Forgot Password?</h1>
        <p className="auth-subtitle">
          Don't worry! Enter your email and we'll send you instructions to reset your password
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="forgot-password-icon">
            <Mail size={48} />
          </div>

          <div className="auth-form-group">
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              error={error}
              required
            />
          </div>

          <Button 
            type="submit" 
            variant="purple" 
            fullWidth 
            className="auth-submit-button"
          >
            Send Reset Link
          </Button>

          <p className="auth-footer-text" style={{ marginTop: 'var(--spacing-lg)' }}>
            Remember your password?{' '}
            <span className="auth-footer-link" onClick={onBack}>
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;