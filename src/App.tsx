import React, { useState } from 'react';
import HomePage from './components/HomePage';
import TutoringRoom from './components/TutoringRoom';
import DebateArena from './components/DebateArena';
import HojoBoard from './components/HojoBoard';
import ChatZone from './components/ChatZone';

type Screen = 'home' | 'tutoring' | 'debate' | 'hojo' | 'chat';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'tutoring':
        return <TutoringRoom onBack={() => setCurrentScreen('home')} />;
      case 'debate':
        return <DebateArena onBack={() => setCurrentScreen('home')} />;
      case 'hojo':
        return <HojoBoard onBack={() => setCurrentScreen('home')} />;
      case 'chat':
        return <ChatZone onBack={() => setCurrentScreen('home')} />;
      default:
        return <HomePage onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {renderScreen()}
    </div>
  );
}

export default App;