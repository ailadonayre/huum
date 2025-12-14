// src/App.js
import { useEffect, useState } from 'react';
import './App.css';
import Chatbot from './components/Chatbot/Chatbot';
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';
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
import EditProfile from './pages/Settings/EditProfile';
import Settings from './pages/Settings/Settings';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visualIntensity, setVisualIntensity] = useState(3);
  const [hapticIntensity, setHapticIntensity] = useState(3);
  const [highContrast, setHighContrast] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    safety: true,
    people: true,
    ambient: false
  });

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding1');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isListening) {
      const soundSimulation = setInterval(() => {
        const sounds = [
          { category: 'Conversation', categoryColor: 'pink', description: 'People and Communication', icon: 'MessageCircle' },
          { category: 'Music', categoryColor: 'green', description: 'Ambient', icon: 'Music' },
          { category: 'Doorbell', categoryColor: 'orange', description: 'Safety', icon: 'Home' },
          { category: 'Phone call', categoryColor: 'pink', description: 'People and Communication', icon: 'Phone' },
          { category: 'Car horn', categoryColor: 'green', description: 'Traffic', icon: 'Car' },
        ];
        
        const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
        const newSound = {
          id: Date.now(),
          ...randomSound,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          timestamp: new Date(),
        };
        
        setDetectedSounds(prev => [newSound, ...prev].slice(0, 20));
      }, Math.random() * 15000 + 10000);

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
    setCurrentScreen(destination);
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
    if (setting === 'edit-profile') {
      setCurrentScreen('edit-profile');
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSignIn = () => {
    setIsAuthenticated(true);
    handleNext('setup-microphone');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setDetectedSounds([]);
    setIsListening(false);
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
            onSignIn={handleSignIn}
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
            onVerify={handleSignIn}
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
            visualIntensity={visualIntensity}
          />
        ) : (
          <Home 
            onNavigate={handleNavigate}
            onToggleListening={toggleListening}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
            detectedSounds={detectedSounds}
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
            onLogout={handleLogout}
            visualIntensity={visualIntensity}
            onVisualIntensityChange={setVisualIntensity}
            highContrast={highContrast}
            onHighContrastChange={setHighContrast}
            hapticIntensity={hapticIntensity}
            onHapticIntensityChange={setHapticIntensity}
            notificationSettings={notificationSettings}
            onNotificationSettingsChange={setNotificationSettings}
          />
        );

      case 'edit-profile':
        return (
          <EditProfile 
            onBack={() => handleNext('settings')}
            userName={userName}
            onSave={(newName) => setUserName(newName)}
          />
        );
      
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
      {isAuthenticated && ['home','activity','learn','library','settings'].includes(currentScreen) && (
        <>
          <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} variant="bottom" />
          <Chatbot 
            isOpen={isChatbotOpen} 
            onToggle={() => setIsChatbotOpen(!isChatbotOpen)} 
          />
        </>
      )}
    </div>
  );
}

export default App;