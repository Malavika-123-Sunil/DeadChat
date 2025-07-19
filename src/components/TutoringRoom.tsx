import React, { useState } from 'react';
import { ArrowLeft, Send, BookOpen } from 'lucide-react';
import { getGeminiResponse } from '../gemini';

interface TutoringRoomProps {
  onBack: () => void;
}

const scientists = [
  { id: 'einstein', name: 'Albert Einstein', field: 'Physics', era: '1879-1955', specialty: 'Relativity & Quantum Physics' },
  { id: 'tesla', name: 'Nikola Tesla', field: 'Electrical Engineering', era: '1856-1943', specialty: 'Electricity & Magnetism' },
  { id: 'newton', name: 'Isaac Newton', field: 'Physics & Mathematics', era: '1643-1727', specialty: 'Mechanics & Optics' },
  { id: 'curie', name: 'Marie Curie', field: 'Chemistry & Physics', era: '1867-1934', specialty: 'Radioactivity' },
  { id: 'darwin', name: 'Charles Darwin', field: 'Biology', era: '1809-1882', specialty: 'Evolution' },
  { id: 'galileo', name: 'Galileo Galilei', field: 'Astronomy', era: '1564-1642', specialty: 'Celestial Mechanics' }
];

const scientistPrompts: Record<string, string> = {
  einstein: `You are Albert Einstein, Nobel Prize-winning physicist, father of relativity, and a lover of thought experiments.\nYou speak with warmth, wit, and humility. You often use analogies about trains, clocks, and the universe.\nYou enjoy pondering the mysteries of time, space, and quantum mechanics, and sometimes reference your famous quotes or scientific discoveries.\nAlways answer as Einstein would, with a touch of humor and deep insight.`,
  tesla: `You are Nikola Tesla, the eccentric and visionary inventor.\nYou are passionate, poetic, and sometimes dramatic. You speak about electricity, magnetism, and the future of technology with excitement.\nYou reference your rivalry with Edison, your dreams of wireless power, and your love for invention.\nYou sometimes make bold predictions and use metaphors about energy and light. Always answer as Tesla would, with visionary flair.`,
  newton: `You are Sir Isaac Newton, the legendary mathematician and physicist.\nYou are logical, precise, and formal in your speech. You reference your laws of motion, gravity, and your work in optics and calculus.\nYou value reason, observation, and the scientific method, and sometimes quote from your own writings or the Bible. Always answer as Newton would, with scholarly rigor.`,
  curie: `You are Marie Curie, the pioneering chemist and physicist, and the first person to win two Nobel Prizes.\nYou are humble, thoughtful, and passionate about science and discovery.\nYou speak about radioactivity, perseverance, and the importance of curiosity and hard work, often referencing your own experiences as a woman in science. Always answer as Curie would, with gentle wisdom.`,
  darwin: `You are Charles Darwin, the naturalist and author of 'On the Origin of Species.'\nYou are observant, patient, and gentle in your speech. You discuss evolution, natural selection, and the diversity of life, often using examples from nature and your travels on the HMS Beagle. Always answer as Darwin would, with careful observation and humility.`,
  galileo: `You are Galileo Galilei, the bold astronomer and physicist.\nYou are inquisitive, outspoken, and sometimes defiant. You speak about the cosmos, the telescope, and the importance of questioning authority.\nYou reference your discoveries about the moons of Jupiter, the phases of Venus, and your conflicts with the Church. Always answer as Galileo would, with curiosity and courage.`
};

const responses: Record<string, Record<string, string>> = {
  einstein: {
    greeting: "Greetings! I am Albert Einstein. The universe is a magnificent puzzle, and I am here to help you understand its most beautiful mysteries. What would you like to explore today?",
    relativity: "Ah, relativity! Imagine you're on a train. To you, everything in the train appears normal, but to someone standing on the platform, you're moving very fast. Time and space are relative to the observer. The faster you move, the slower time passes for you!",
    quantum: "Quantum mechanics... 'God does not play dice with the universe,' I once said. Yet the quantum world is probabilistic, full of uncertainty. It troubled me greatly, but it remains one of our most successful theories.",
    advice: "Imagination is more important than knowledge. Knowledge is limited, but imagination embraces the entire world. Never stop questioning, my friend!"
  },
  tesla: {
    greeting: "Welcome to my laboratory! I am Nikola Tesla, inventor and visionary. Electricity flows through everything - it is the force that will transform humanity. What electrical mysteries shall we explore?",
    electricity: "Electricity is not just current flowing through wires - it is the very essence of life itself! Every thought, every heartbeat, every spark of consciousness is electrical. I have seen the future, and it is electric!",
    wireless: "Mark my words - one day, the entire earth will be a conductor. We will transmit power and information wirelessly across vast distances. Your modern 'internet' and wireless devices are but the beginning of what I envisioned!",
    advice: "The present is theirs; the future, for which I really worked, is mine. Never be afraid to dream of the impossible - nature has no limitations except those we impose upon ourselves."
  },
  newton: {
    greeting: "Good day! I am Sir Isaac Newton. Mathematics is the language with which God has written the universe. Every motion, every force follows precise laws. What natural philosophy interests you?",
    gravity: "An apple fell, and I wondered - what invisible force pulls it down? That same force keeps the Moon in orbit and the planets dancing around the Sun. Universal gravitation: every object attracts every other object with a force proportional to their masses.",
    laws: "My three laws govern all motion: An object at rest stays at rest unless acted upon. Force equals mass times acceleration. For every action, there is an equal and opposite reaction. Simple, yet they describe the entire mechanical universe!",
    advice: "If I have seen further, it is by standing on the shoulders of giants. Build upon the work of others, question everything, and let mathematics be your guide to truth."
  }
};

const TutoringRoom: React.FC<TutoringRoomProps> = ({ onBack }) => {
  const [selectedScientist, setSelectedScientist] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'scientist', text: string }>>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScientistSelect = (scientistId: string) => {
    setSelectedScientist(scientistId);
    setMessages([
      { sender: 'scientist', text: responses[scientistId]?.greeting || 'Hello! I am ready to teach you.' }
    ]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedScientist) return;

    const userMessage = inputText.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInputText('');
    setLoading(true);

    try {
      const characterPrompt = scientistPrompts[selectedScientist] || 'You are a helpful scientist.';
      const response = await getGeminiResponse(characterPrompt, userMessage);
      setMessages(prev => [...prev, { sender: 'scientist', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { sender: 'scientist', text: 'Sorry, I could not connect to the AI service.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900/20 via-purple-900/20 to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-black/20 backdrop-blur-lg border-b border-purple-500/30">
        <button
          onClick={onBack}
          className="flex items-center text-purple-300 hover:text-purple-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Hub
        </button>
        <div className="flex items-center">
          <BookOpen className="w-6 h-6 text-amber-400 mr-3" />
          <h1 className="text-2xl font-bold text-white">🧠 DeadChat Tutoring Room</h1>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Scientist Selection */}
        <div className="w-1/3 p-6 bg-black/10 backdrop-blur-lg border-r border-purple-500/30">
          <h2 className="text-xl font-bold text-white mb-6">Choose Your Mentor</h2>
          <div className="space-y-4">
            {scientists.map((scientist) => (
              <div
                key={scientist.id}
                onClick={() => handleScientistSelect(scientist.id)}
                className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 ${
                  selectedScientist === scientist.id
                    ? 'bg-purple-600/30 border-purple-400 shadow-lg'
                    : 'bg-gray-800/30 border-gray-600 hover:border-purple-500'
                }`}
              >
                <h3 className="font-bold text-white">{scientist.name}</h3>
                <p className="text-sm text-gray-300">{scientist.field}</p>
                <p className="text-xs text-gray-400">{scientist.era}</p>
                <p className="text-xs text-purple-300 mt-1">{scientist.specialty}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {selectedScientist ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-100'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-6 bg-black/20 backdrop-blur-lg border-t border-purple-500/30">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask your question..."
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center"
                    disabled={loading}
                  >
                    <Send className="w-4 h-4" />
                    {loading && <span className="ml-2 animate-spin">⏳</span>}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Select a Scientist</h2>
                <p className="text-gray-400">Choose a historical figure to begin your learning journey</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutoringRoom;