import { useEffect, useState } from 'react';
import './App.css';
import Activity from './pages/Activity/Activity';
import CreateAccount from './pages/Auth/CreateAccount';
import SignIn from './pages/Auth/SignIn';
import VerifyEmail from './pages/Auth/VerifyEmail';
import Home from './pages/Home/Home';
import Listening from './pages/Home/Listening';
import CreateCategory from './pages/Learn/CreateCategory';
import Learn from './pages/Learn/Learn';
import Onboarding1 from './pages/Onboarding/Onboarding1';
import Onboarding2 from './pages/Onboarding/Onboarding2';
import Onboarding3 from './pages/Onboarding/Onboarding3';
import SetupMicrophone from './pages/Setup/SetupMicrophone';
import SetupNotifications from './pages/Setup/SetupNotifications';
import AddSound from './pages/SoundLibrary/AddSound';
import SoundLibrary from './pages/SoundLibrary/SoundLibrary';
import SoundRecording from './pages/SoundLibrary/SoundRecording';
import SplashScreen from './pages/SplashScreen/SplashScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [userName, setUserName] = useState('User');
  const [isListening, setIsListening] = useState(false);
  const [currentSoundName, setCurrentSoundName] = useState('');

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

  const handleNavigate = (destination) => {
    if (destination === 'home') {
      setCurrentScreen('home');
    } else if (destination === 'activity') {
      setCurrentScreen('activity');
    } else if (destination === 'learn') {
      setCurrentScreen('learn');
    } else if (destination === 'library') {
      setCurrentScreen('library');
    } else if (destination === 'settings') {
      setCurrentScreen('settings');
    }
  };

  const handleCreateCategory = () => {
    setCurrentScreen('create-category');
  };

  const handleCategoryCreated = () => {
    setCurrentScreen('learn');
  };

  const handleAddSound = () => {
    setCurrentScreen('add-sound');
  };

  const handleRecordSound = () => {
    setCurrentScreen('sound-recording');
  };

  const handleSoundSaved = () => {
    setCurrentScreen('library');
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
      
      case 'setup-microphone':
        return (
          <SetupMicrophone
            onBack={() => handleNext('verifyemail')}
            onNext={() => handleNext('setup-notifications')}
            onSkip={() => handleNext('setup-notifications')}
            userName={userName}
          />
        );
      
      case 'setup-notifications':
        return (
          <SetupNotifications
            onBack={() => handleNext('setup-microphone')}
            onNext={() => handleNext('home')}
            onSkip={() => handleNext('home')}
          />
        );
      
      case 'home':
        return isListening ? (
          <Listening onNavigate={handleNavigate} />
        ) : (
          <Home onNavigate={handleNavigate} />
        );
      
      case 'activity':
        return <Activity onNavigate={handleNavigate} />;
      
      case 'learn':
        return (
          <Learn 
            onNavigate={handleNavigate}
            onCreateCategory={handleCreateCategory}
          />
        );
      
      case 'create-category':
        return (
          <CreateCategory
            onBack={() => handleNext('learn')}
            onCreate={handleCategoryCreated}
          />
        );
      
      case 'library':
        return (
          <SoundLibrary
            onNavigate={handleNavigate}
            onAddSound={handleAddSound}
          />
        );
      
      case 'add-sound':
        return (
          <AddSound
            onBack={() => handleNext('library')}
            onRecord={handleRecordSound}
          />
        );
      
      case 'sound-recording':
        return (
          <SoundRecording
            onBack={() => handleNext('add-sound')}
            onSave={handleSoundSaved}
            soundName={currentSoundName || 'New Sound'}
          />
        );
      
      case 'settings':
        return (
          <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'var(--color-white)',
            color: 'var(--color-dark-purple)',
            fontSize: '24px',
            fontWeight: 'bold',
            paddingBottom: '80px'
          }}>
            Settings Screen Coming Next! 🎉
          </div>
        );
      
      default:
        return <SplashScreen />;
    }
  };

  return <div className="app">{renderScreen()}</div>;
}

export default App;