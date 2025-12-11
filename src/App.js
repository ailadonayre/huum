import { useEffect, useState } from 'react';
import './App.css';
import Chatbot from './components/Chatbot/Chatbot';
import Activity from './pages/Activity/Activity';
import CreateAccount from './pages/Auth/CreateAccount';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import SignIn from './pages/Auth/SignIn';
import VerifyEmail from './pages/Auth/VerifyEmail';
import Home from './pages/Home/Home';
import Listening from './pages/Home/Listening';
import CreateCategory from './pages/Learn/CreateCategory';
import Learn from './pages/Learn/Learn';
import Onboarding1 from './pages/Onboarding/Onboarding1';
import Onboarding2 from './pages/Onboarding/Onboarding2';
import Onboarding3 from './pages/Onboarding/Onboarding3';
import Settings from './pages/Settings/Settings';
import VisualFeedback from './pages/Settings/VisualFeedback';
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [detectedSounds, setDetectedSounds] = useState([]);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding1');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Simulate sound detection when listening
  useEffect(() => {
    if (isListening) {
      const soundSimulation = setInterval(() => {
        const sounds = [
          { category: 'Conversation', categoryColor: 'pink', description: 'People and Communication' },
          { category: 'Music', categoryColor: 'green', description: 'Ambient' },
          { category: 'Doorbell', categoryColor: 'orange', description: 'Safety' },
          { category: 'Phone call', categoryColor: 'pink', description: 'People and Communication' },
          { category: 'Car horn', categoryColor: 'green', description: 'Traffic' },
        ];
        
        const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
        const newSound = {
          id: Date.now(),
          ...randomSound,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          timestamp: new Date(),
        };
        
        setDetectedSounds(prev => [newSound, ...prev].slice(0, 20));
      }, Math.random() * 15000 + 10000); // Random interval between 10-25 seconds

      return () => clearInterval(soundSimulation);
    }
  }, [isListening]);

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

  const handleSettingClick = (setting) => {
    if (setting === 'visual-feedback') {
      setCurrentScreen('visual-feedback');
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
            onForgotPassword={() => handleNext('forgot-password')}
          />
        );
      
      case 'forgot-password':
        return (
          <ForgotPassword
            onBack={() => handleNext('signin')}
            onContinue={() => handleNext('reset-password')}
          />
        );
      
      case 'reset-password':
        return (
          <ResetPassword
            onBack={() => handleNext('forgot-password')}
            onReset={() => handleNext('signin')}
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
          <Listening 
            onNavigate={handleNavigate} 
            detectedSounds={detectedSounds}
            onToggleListening={toggleListening}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        ) : (
          <Home 
            onNavigate={handleNavigate}
            onToggleListening={toggleListening}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      
      case 'activity':
        return <Activity onNavigate={handleNavigate} detectedSounds={detectedSounds} />;
      
      case 'learn':
        return (
          <Learn 
            onNavigate={handleNavigate}
            onCreateCategory={handleCreateCategory}
            detectedSounds={detectedSounds}
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
          <Settings
            onNavigate={handleNavigate}
            onSettingClick={handleSettingClick}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      
      case 'visual-feedback':
        return (
          <VisualFeedback onBack={() => handleNext('settings')} />
        );
      
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
      <Chatbot isOpen={isChatbotOpen} onToggle={() => setIsChatbotOpen(!isChatbotOpen)} />
    </div>
  );
}

export default App;