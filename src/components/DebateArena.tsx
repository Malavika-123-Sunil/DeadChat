import React, { useState } from 'react';
import { ArrowLeft, Users, Play, Pause } from 'lucide-react';

interface DebateArenaProps {
  onBack: () => void;
}

const scientists = [
  { id: 'einstein', name: 'Albert Einstein', field: 'Physics' },
  { id: 'tesla', name: 'Nikola Tesla', field: 'Electrical Engineering' },
  { id: 'newton', name: 'Isaac Newton', field: 'Physics & Mathematics' },
  { id: 'curie', name: 'Marie Curie', field: 'Chemistry & Physics' },
  { id: 'darwin', name: 'Charles Darwin', field: 'Biology' },
  { id: 'bohr', name: 'Niels Bohr', field: 'Quantum Physics' },
  { id: 'hawking', name: 'Stephen Hawking', field: 'Theoretical Physics' },
  { id: 'turing', name: 'Alan Turing', field: 'Computer Science' }
];

const debateTopics = [
  'The Nature of Time and Reality',
  'Is the Universe Deterministic or Random?',
  'The Future of Human Technology',
  'The Greatest Scientific Discovery',
  'The Role of Mathematics in Nature',
  'Consciousness and Artificial Intelligence'
];

const debates: Record<string, Array<{ speaker: string, message: string }>> = {
  'einstein-bohr': [
    { speaker: 'Einstein', message: 'Niels, my friend, I cannot accept that God plays dice with the universe. Quantum mechanics must have hidden variables that we simply haven\'t discovered yet.' },
    { speaker: 'Bohr', message: 'Albert, you must accept that at the quantum level, uncertainty is fundamental! The act of observation itself affects reality. There are no hidden variables - only probabilities.' },
    { speaker: 'Einstein', message: 'But this leads to absurd conclusions! A particle cannot be in two places at once until observed. "Spooky action at a distance" defies all logic!' },
    { speaker: 'Bohr', message: 'Logic at our scale doesn\'t apply to the quantum world. Complementarity shows us that wave and particle descriptions are both necessary and valid.' },
    { speaker: 'Einstein', message: 'I refuse to believe that reality is fundamentally probabilistic. There must be a deeper theory that restores determinism to physics.' },
    { speaker: 'Bohr', message: 'Albert, sometimes we must accept that nature is stranger than our classical intuitions. Quantum mechanics works - it predicts experimental results perfectly!' }
  ],
  'tesla-edison': [
    { speaker: 'Tesla', message: 'Thomas, your direct current is inefficient! Alternating current can be transmitted over great distances with minimal loss. The future belongs to AC!' },
    { speaker: 'Edison', message: 'Nikola, AC is dangerous! People will be electrocuted in their homes. DC is safe, reliable, and easier to control. I have the patents and the infrastructure.' },
    { speaker: 'Tesla', message: 'Safety concerns can be addressed with proper engineering. But efficiency cannot be ignored! AC allows us to step voltage up and down with transformers.' },
    { speaker: 'Edison', message: 'The public fears what they don\'t understand. DC has proven itself in my systems across the nation. Why risk change?' },
    { speaker: 'Tesla', message: 'Because progress demands we transcend limitations! My polyphase system will power entire cities, even nations, with unprecedented efficiency!' },
    { speaker: 'Edison', message: 'Practical application matters more than theoretical elegance, my friend. Business and science must work together.' }
  ]
};

const DebateArena: React.FC<DebateArenaProps> = ({ onBack }) => {
  const [selectedScientist1, setSelectedScientist1] = useState<string | null>(null);
  const [selectedScientist2, setSelectedScientist2] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isDebating, setIsDebating] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Array<{ speaker: string, message: string }>>([]);

  const startDebate = () => {
    if (!selectedScientist1 || !selectedScientist2 || !selectedTopic) return;
    
    setIsDebating(true);
    setCurrentMessageIndex(0);
    setDisplayedMessages([]);
    
    const debateKey = `${selectedScientist1}-${selectedScientist2}`;
    const debateMessages = debates[debateKey] || generateGenericDebate();
    
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => {
        if (prevIndex >= debateMessages.length - 1) {
          clearInterval(interval);
          return prevIndex;
        }
        setDisplayedMessages(prev => [...prev, debateMessages[prevIndex]]);
        return prevIndex + 1;
      });
    }, 3000);
  };

  const generateGenericDebate = () => {
    const scientist1Name = scientists.find(s => s.id === selectedScientist1)?.name || 'Scientist 1';
    const scientist2Name = scientists.find(s => s.id === selectedScientist2)?.name || 'Scientist 2';
    
    return [
      { speaker: scientist1Name, message: `I believe that ${selectedTopic?.toLowerCase()} requires a fundamental rethinking of our current understanding.` },
      { speaker: scientist2Name, message: `Interesting perspective, but I disagree. Our current framework provides the best explanation for the evidence we have.` },
      { speaker: scientist1Name, message: 'But consider the implications! We must be willing to challenge even our most cherished assumptions.' },
      { speaker: scientist2Name, message: 'True, but we must also be cautious not to abandon proven theories without compelling evidence.' },
      { speaker: scientist1Name, message: 'Progress in science demands bold hypotheses and rigorous testing. We cannot let dogma hold us back.' },
      { speaker: scientist2Name, message: 'I agree that science must progress, but it must do so methodically, building upon solid foundations.' }
    ];
  };

  const resetDebate = () => {
    setIsDebating(false);
    setCurrentMessageIndex(0);
    setDisplayedMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900/20 via-purple-900/20 to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-black/20 backdrop-blur-lg border-b border-emerald-500/30">
        <button
          onClick={onBack}
          className="flex items-center text-emerald-300 hover:text-emerald-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Hub
        </button>
        <div className="flex items-center">
          <Users className="w-6 h-6 text-emerald-400 mr-3" />
          <h1 className="text-2xl font-bold text-white">⚔️ DeadChat Debate Arena</h1>
        </div>
      </div>

      <div className="p-8">
        {!isDebating ? (
          <div className="max-w-4xl mx-auto">
            {/* Setup Panel */}
            <div className="bg-black/20 backdrop-blur-lg border border-emerald-500/30 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Setup Your Debate</h2>
              
              {/* Scientist Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-300 mb-4">First Debater</h3>
                  <div className="space-y-2">
                    {scientists.map((scientist) => (
                      <div
                        key={scientist.id}
                        onClick={() => setSelectedScientist1(scientist.id)}
                        className={`cursor-pointer p-3 rounded-lg border transition-all ${
                          selectedScientist1 === scientist.id
                            ? 'bg-emerald-600/30 border-emerald-400'
                            : 'bg-gray-800/30 border-gray-600 hover:border-emerald-500'
                        }`}
                      >
                        <p className="font-medium text-white">{scientist.name}</p>
                        <p className="text-sm text-gray-300">{scientist.field}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-emerald-300 mb-4">Second Debater</h3>
                  <div className="space-y-2">
                    {scientists.map((scientist) => (
                      <div
                        key={scientist.id}
                        onClick={() => setSelectedScientist2(scientist.id)}
                        className={`cursor-pointer p-3 rounded-lg border transition-all ${
                          selectedScientist2 === scientist.id
                            ? 'bg-emerald-600/30 border-emerald-400'
                            : 'bg-gray-800/30 border-gray-600 hover:border-emerald-500'
                        }`}
                      >
                        <p className="font-medium text-white">{scientist.name}</p>
                        <p className="text-sm text-gray-300">{scientist.field}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Topic Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-emerald-300 mb-4">Debate Topic</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {debateTopics.map((topic) => (
                    <div
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={`cursor-pointer p-4 rounded-lg border transition-all ${
                        selectedTopic === topic
                          ? 'bg-emerald-600/30 border-emerald-400'
                          : 'bg-gray-800/30 border-gray-600 hover:border-emerald-500'
                      }`}
                    >
                      <p className="text-white">{topic}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={startDebate}
                disabled={!selectedScientist1 || !selectedScientist2 || !selectedTopic}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Begin Debate
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Debate Header */}
            <div className="bg-black/20 backdrop-blur-lg border border-emerald-500/30 rounded-xl p-6 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {scientists.find(s => s.id === selectedScientist1)?.name} vs {scientists.find(s => s.id === selectedScientist2)?.name}
                  </h2>
                  <p className="text-emerald-300">Topic: {selectedTopic}</p>
                </div>
                <button
                  onClick={resetDebate}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Debate Messages */}
            <div className="space-y-6">
              {displayedMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.speaker === scientists.find(s => s.id === selectedScientist1)?.name ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-2xl p-6 rounded-xl ${
                      message.speaker === scientists.find(s => s.id === selectedScientist1)?.name
                        ? 'bg-emerald-800/30 border-l-4 border-emerald-400'
                        : 'bg-purple-800/30 border-r-4 border-purple-400'
                    }`}
                  >
                    <p className="font-semibold text-emerald-200 mb-2">{message.speaker}</p>
                    <p className="text-white leading-relaxed">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebateArena;