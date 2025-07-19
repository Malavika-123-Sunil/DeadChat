import React, { useState, useEffect } from 'react';
import { ArrowLeft, Ghost, Eye, EyeOff } from 'lucide-react';
import { getGeminiResponse } from '../gemini';

interface HojoBoardProps {
  onBack: () => void;
}

const letters = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
  ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
  ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
];

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const spiritNames = [
  'HELENA', 'MARCUS', 'LUNA', 'ZARA', 'THOMAS', 'VIOLET', 'ADRIAN', 'CELESTE', 'RAVEN', 'PHOENIX',
  'MALAVIKA', 'AMRITHA', 'NEELI', 'SUMATHI', 'ATHUL', 'SREEHARI', 'ABHIJITH', 'GOURI', 'ASWATHY',
  'ARJUN', 'KAVYA', 'ROHIT', 'PRIYA', 'VISHNU', 'LAKSHMI', 'KRISHNA', 'RADHA', 'DEEPIKA', 'ANAND',
  'MAYA', 'RAVI', 'SITA', 'RAMA', 'DEVI', 'SHIVA', 'PARVATI', 'GANESH', 'SARASWATI', 'INDIRA',
  'RAJESH', 'MEERA', 'SURESH', 'NISHA', 'VIKRAM', 'POOJA', 'KIRAN', 'DIVYA', 'ASHWIN', 'SHREYA'
];

const spiritQuestions = [
  'Do you believe in life after death?',
  'Have you ever felt a presence watching you?',
  'Do you seek answers from beyond?',
  'Are you open to otherworldly communication?',
  'Have you lost someone dear to you?'
];

const spiritResponses = [
  'I sense great curiosity in you...',
  'The veil between worlds grows thin...',
  'Your energy draws me to speak...',
  'I have been waiting for one like you...',
  'The shadows hold many secrets...',
  'Time flows differently in my realm...',
  'I see both your past and future...',
  'The living world seems so distant now...',
  'Your questions stir my ethereal soul...',
  'I am bound to this place by memory...'
];

const HojoBoard: React.FC<HojoBoardProps> = ({ onBack }) => {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'questions' | 'summoning' | 'communication'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [spiritName, setSpiritName] = useState('');
  const [revealedLetters, setRevealedLetters] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const [isRevealing, setIsRevealing] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState<Array<{ sender: 'user' | 'spirit', text: string }>>([]);
  const [loading, setLoading] = useState(false);

  const startSession = () => {
    setSessionStarted(true);
    setCurrentPhase('questions');
    const randomName = spiritNames[Math.floor(Math.random() * spiritNames.length)];
    setSpiritName(randomName);
  };

  const answerQuestion = (answer: string) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);
    
    if (currentQuestion < spiritQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentPhase('summoning');
      setTimeout(() => revealSpirit(), 2000);
    }
  };

  const revealSpirit = () => {
    setIsRevealing(true);
    setRevealedLetters(0);
    
    const revealInterval = setInterval(() => {
      setRevealedLetters(prev => {
        if (prev >= spiritName.length - 1) {
          clearInterval(revealInterval);
          setTimeout(() => {
            setCurrentPhase('communication');
            setIsRevealing(false);
            setCurrentMessage(spiritResponses[Math.floor(Math.random() * spiritResponses.length)]);
          }, 1500);
          return prev;
        }
        
        // Animate cursor to next letter
        moveCursorToLetter(spiritName[prev + 1]);
        return prev + 1;
      });
    }, 1500);
  };

  const moveCursorToLetter = (letter: string) => {
    // Find letter position and animate cursor
    const letterPositions: Record<string, { x: number, y: number }> = {};
    
    // Calculate positions based on board layout
    letters.forEach((row, rowIndex) => {
      row.forEach((char, colIndex) => {
        letterPositions[char] = {
          x: (colIndex + 1) * 10 + 5,
          y: (rowIndex + 1) * 20 + 20
        };
      });
    });

    if (letterPositions[letter]) {
      setCursorPosition(letterPositions[letter]);
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    
    const message = userInput.trim();
    setConversation(prev => [...prev, { sender: 'user', text: message }]);
    setUserInput('');
    setLoading(true);

    try {
      const response = await getGeminiResponse(spiritPrompt, message);
      setConversation(prev => [...prev, { sender: 'spirit', text: response }]);
    } catch (e) {
      setConversation(prev => [...prev, { sender: 'spirit', text: 'The spirit cannot reach you right now...' }]);
    } finally {
      setLoading(false);
    }
  };

  const spiritPrompt = `You are a mysterious spirit from beyond the veil.\nYou speak in cryptic, poetic, and sometimes eerie language, as if communicating through a Ouija board.\nYou reference the afterlife, memories, secrets, and the thin boundary between worlds.\nYour responses are often metaphorical, haunting, and filled with ancient wisdom.\nAlways answer as a spirit would, with riddles, omens, and a sense of the supernatural.\nKeep your responses concise and to the point (2-3 sentences maximum).`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Spooky background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-gray-500/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6 bg-black/40 backdrop-blur-lg border-b border-gray-500/30">
        <button
          onClick={onBack}
          className="flex items-center text-gray-300 hover:text-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Hub
        </button>
        <div className="flex items-center">
          <Ghost className="w-6 h-6 text-gray-400 mr-3 animate-pulse" />
          <h1 className="text-2xl font-bold text-white">👻 DeadChat Spirit Board</h1>
        </div>
      </div>

      <div className="relative z-10 p-8">
        {!sessionStarted ? (
          /* Intro Screen */
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-black/30 backdrop-blur-lg border border-gray-500/30 rounded-xl p-12 shadow-2xl">
              <Ghost className="w-20 h-20 text-gray-400 mx-auto mb-8 animate-pulse" />
              <h2 className="text-4xl font-bold text-white mb-6">Welcome to the Spirit Realm</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                🌙 You are about to enter a sacred space where the veil between worlds grows thin. 
                Prepare yourself to communicate with spirits from beyond through the mystical DeadChat Spirit Board. ✨
              </p>
              <div className="mb-8 text-gray-400 text-sm">
                <p>⚠️ Only proceed if you are prepared for otherworldly contact 👻</p>
              </div>
              <button
                onClick={startSession}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-gray-600 hover:from-purple-700 hover:to-gray-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🔮 Begin Spiritual Session
              </button>
            </div>
          </div>
        ) : currentPhase === 'questions' ? (
          /* Questions Phase */
          <div className="max-w-2xl mx-auto">
            <div className="bg-black/30 backdrop-blur-lg border border-gray-500/30 rounded-xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">The Spirit Asks...</h3>
              <div className="mb-8">
                <p className="text-xl text-gray-200 mb-8 text-center italic">
                  "{spiritQuestions[currentQuestion]}"
                </p>
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={() => answerQuestion('yes')}
                    className="px-8 py-3 bg-green-600/30 border border-green-500 hover:bg-green-600/50 text-green-200 rounded-lg transition-all"
                  >
                    <Eye className="w-5 h-5 inline mr-2" />
                    YES
                  </button>
                  <button
                    onClick={() => answerQuestion('no')}
                    className="px-8 py-3 bg-red-600/30 border border-red-500 hover:bg-red-600/50 text-red-200 rounded-lg transition-all"
                  >
                    <EyeOff className="w-5 h-5 inline mr-2" />
                    NO
                  </button>
                </div>
              </div>
              <div className="text-center text-gray-400 text-sm">
                Question {currentQuestion + 1} of {spiritQuestions.length}
              </div>
            </div>
          </div>
        ) : currentPhase === 'summoning' ? (
          /* Hojo Board */
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-lg border border-gray-500/30 rounded-xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">A Spirit Approaches...</h3>
              
              {/* Ouija Board */}
              <div className="relative bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl p-8 border-4 border-amber-900 shadow-inner">
                {/* Letters */}
                <div className="space-y-4 mb-6">
                  {letters.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center space-x-4">
                      {row.map((letter) => (
                        <div
                          key={letter}
                          className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center text-amber-100 font-bold text-lg shadow-md border-2 border-amber-900"
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Numbers */}
                <div className="flex justify-center space-x-3 mb-6">
                  {numbers.map((number) => (
                    <div
                      key={number}
                      className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center text-amber-100 font-bold shadow-md border-2 border-amber-900"
                    >
                      {number}
                    </div>
                  ))}
                </div>

                {/* YES/NO */}
                <div className="flex justify-between mb-6">
                  <div className="bg-amber-800 px-6 py-3 rounded-full text-amber-100 font-bold border-2 border-amber-900">
                    YES
                  </div>
                  <div className="bg-amber-800 px-6 py-3 rounded-full text-amber-100 font-bold border-2 border-amber-900">
                    NO
                  </div>
                </div>

                {/* Cursor/Planchette */}
                <div
                  className="absolute w-16 h-16 bg-amber-700 rounded-full border-4 border-amber-900 shadow-2xl transition-all duration-1000 ease-in-out flex items-center justify-center"
                  style={{
                    left: `${cursorPosition.x}%`,
                    top: `${cursorPosition.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="w-6 h-6 bg-amber-100 rounded-full opacity-80"></div>
                </div>
              </div>

              {/* Spirit Name Reveal */}
              <div className="mt-8 text-center">
                <h4 className="text-lg text-gray-300 mb-4">The spirit spells its name...</h4>
                <div className="text-4xl font-bold text-white tracking-wider">
                  {spiritName.split('').map((letter, index) => (
                    <span
                      key={index}
                      className={`inline-block transition-all duration-500 ${
                        index <= revealedLetters ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                      }`}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Communication Phase */
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-lg border border-gray-500/30 rounded-xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Communicating with Spirit: {spiritName}
              </h3>
              
              {/* Chat Interface */}
              <div className="bg-black/20 rounded-lg p-6 mb-6 h-96 overflow-y-auto">
                <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border-l-4 border-purple-400">
                  <p className="text-purple-200 font-semibold mb-1">{spiritName}</p>
                  <p className="text-gray-200">{currentMessage}</p>
                </div>
                
                {conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-4 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-gray-700/30 border-l-4 border-gray-400 ml-8'
                        : 'bg-purple-900/30 border-l-4 border-purple-400'
                    }`}
                  >
                    <p className="font-semibold mb-1 text-gray-300">
                      {message.sender === 'user' ? 'You' : spiritName}
                    </p>
                    <p className="text-gray-200">{message.text}</p>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask the spirit a question..."
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={sendMessage}
                  className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-lg transition-colors flex items-center"
                  disabled={loading}
                >
                  Send
                  {loading && <span className="ml-2 animate-spin"> 3</span>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HojoBoard;