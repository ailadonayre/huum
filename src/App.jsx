import { useEffect, useState } from 'react';
import './App.css';
import CreateAccount from './pages/Auth/CreateAccount';
import SignIn from './pages/Auth/SignIn';
import VerifyEmail from './pages/Auth/VerifyEmail';
import Onboarding1 from './pages/Onboarding/Onboarding1';
import Onboarding2 from './pages/Onboarding/Onboarding2';
import Onboarding3 from './pages/Onboarding/Onboarding3';
import SplashScreen from './pages/SplashScreen/SplashScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding1');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleNext = (nextScreen) => {
    setCurrentScreen(nextScreen);
  };

  const handleSkip = () => {
    setCurrentScreen('signin');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;

      case 'onboarding1':
        return (
          <Onboarding1
            onNext={() => handleNext('onboarding2')}
            onSkip={handleSkip}
          />
        );

      case 'onboarding2':
        return (
          <Onboarding2
            onNext={() => handleNext('onboarding3')}
            onSkip={handleSkip}
          />
        );

      case 'onboarding3':
        return (
          <Onboarding3
            onNext={() => handleNext('signin')}
            onSkip={handleSkip}
          />
        );

      case 'signin':
        return (
          <SignIn
            onBack={() => handleNext('onboarding3')}
            onSignIn={() => handleNext('setup-microphone')}
            onCreateAccount={() => handleNext('createaccount')}
          />
        );

      case 'createaccount':
        return (
          <CreateAccount
            onBack={() => handleNext('signin')}
            onCreate={() => handleNext('verifyemail')}
            onSignIn={() => handleNext('signin')}
          />
        );

      case 'verifyemail':
        return (
          <VerifyEmail
            onBack={() => handleNext('createaccount')}
            onVerify={() => handleNext('setup-microphone')}
          />
        );

      default:
        return <SplashScreen />;
    }
  };

  return <div className="app">{renderScreen()}</div>;
}

export default App;