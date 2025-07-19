import React from 'react';
import { Brain, Users, Ghost, MessageCircle, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (screen: 'tutoring' | 'debate' | 'hojo' | 'chat') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gold-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-purple-400 mr-4 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-emerald-400 to-yellow-400 bg-clip-text text-transparent">
              DeadChat
            </h1>
            <div className="relative">
              <Sparkles className="w-16 h-16 text-emerald-400 ml-4 animate-pulse" />
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-ping delay-500"></div>
            </div>
          </div>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
            🚀 Connect with history's greatest minds, witness epic intellectual battles, 
            and communicate with mysterious spirits from beyond 🌟
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
          {/* Time-Travel Tutoring */}
          <div 
            onClick={() => onNavigate('tutoring')}
            className="group cursor-pointer transform hover:scale-110 transition-all duration-500 hover:rotate-1"
          >
            <div className="relative bg-gradient-to-br from-purple-800/60 to-purple-900/60 backdrop-blur-xl border-2 border-purple-500/40 rounded-2xl p-8 h-72 flex flex-col items-center justify-center text-center hover:border-purple-300/70 hover:shadow-2xl hover:shadow-purple-500/40 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <Brain className="w-20 h-20 text-purple-300 mb-4 group-hover:animate-bounce group-hover:text-purple-200 transition-all duration-300" />
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-100">🧠 Time-Travel Tutoring</h3>
                <p className="text-purple-200 text-sm group-hover:text-purple-100">Learn directly from Einstein, Tesla, Newton, and other legendary minds</p>
              </div>
            </div>
          </div>

          {/* Debate Arena */}
          <div 
            onClick={() => onNavigate('debate')}
            className="group cursor-pointer transform hover:scale-110 transition-all duration-500 hover:-rotate-1"
          >
            <div className="relative bg-gradient-to-br from-emerald-800/60 to-emerald-900/60 backdrop-blur-xl border-2 border-emerald-500/40 rounded-2xl p-8 h-72 flex flex-col items-center justify-center text-center hover:border-emerald-300/70 hover:shadow-2xl hover:shadow-emerald-500/40 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <Users className="w-20 h-20 text-emerald-300 mb-4 group-hover:animate-bounce group-hover:text-emerald-200 transition-all duration-300" />
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-100">⚔️ Debate Arena</h3>
                <p className="text-emerald-200 text-sm group-hover:text-emerald-100">Watch epic intellectual battles between history's greatest scientists</p>
              </div>
            </div>
          </div>

          {/* Spirit Hojo Board */}
          <div 
            onClick={() => onNavigate('hojo')}
            className="group cursor-pointer transform hover:scale-110 transition-all duration-500 hover:rotate-1"
          >
            <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border-2 border-gray-500/40 rounded-2xl p-8 h-72 flex flex-col items-center justify-center text-center hover:border-gray-300/70 hover:shadow-2xl hover:shadow-gray-500/40 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <Ghost className="w-20 h-20 text-gray-300 mb-4 group-hover:animate-bounce group-hover:text-gray-200 transition-all duration-300" />
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-100">👻 Spirit Hojo Board</h3>
                <p className="text-gray-200 text-sm group-hover:text-gray-100">Communicate with mysterious spirits through the digital Ouija board</p>
              </div>
            </div>
          </div>

          {/* Random Chat Zone */}
          <div 
            onClick={() => onNavigate('chat')}
            className="group cursor-pointer transform hover:scale-110 transition-all duration-500 hover:-rotate-1"
          >
            <div className="relative bg-gradient-to-br from-yellow-800/60 to-yellow-900/60 backdrop-blur-xl border-2 border-yellow-500/40 rounded-2xl p-8 h-72 flex flex-col items-center justify-center text-center hover:border-yellow-300/70 hover:shadow-2xl hover:shadow-yellow-500/40 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <MessageCircle className="w-20 h-20 text-yellow-300 mb-4 group-hover:animate-bounce group-hover:text-yellow-200 transition-all duration-300" />
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-100">💬 Random Chat Zone</h3>
                <p className="text-yellow-200 text-sm group-hover:text-yellow-100">Have fun casual conversations with any historical figure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-purple-300 text-sm">
            🌟 Where History Comes Alive & Spirits Speak 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;