import { ChevronLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import logoWhite from '../../assets/icons/huum logo-white.png';
import Button from '../../components/Button/Button';
import './Auth.css';

const VerifyEmail = ({ onBack, onVerify, email = 'user@example.com' }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = pastedData.split('').slice(0, 6);
    
    newCode.forEach((char, index) => {
      if (/^\d$/.test(char)) {
        handleChange(index, char);
      }
    });

    // Focus last filled input or first empty
    const lastFilledIndex = newCode.length - 1;
    inputRefs.current[Math.min(lastFilledIndex + 1, 5)]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    if (verificationCode.length === 6) {
      // After verification, redirect to signin instead of setup
      onVerify();
    }
  };

  const handleResend = () => {
    console.log('Resending verification code...');
    // Reset code
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const isCodeComplete = code.every(digit => digit !== '');

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
        <h1 className="auth-title">Verify email address</h1>
        <p className="auth-subtitle">
          We've sent a verification code sent to your email
        </p>

        <form className="auth-form verify-email-content" onSubmit={handleSubmit}>
          <div className="verify-code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="verify-code-input"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          <Button 
            type="submit" 
            variant="purple" 
            fullWidth 
            disabled={!isCodeComplete}
          >
            Verify
          </Button>

          <p className="verify-resend-text">
            Did not receive a code?{' '}
            <span className="verify-resend-link" onClick={handleResend}>
              Resend it
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;