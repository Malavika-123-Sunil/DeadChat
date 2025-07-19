import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Send, Shuffle } from 'lucide-react';
import { getGeminiResponse } from '../gemini';

interface ChatZoneProps {
  onBack: () => void;
}

const historicalFigures = [
  { id: 'leonardo', name: 'Leonardo da Vinci', era: 'Renaissance', personality: 'Curious, artistic, inventive' },
  { id: 'shakespeare', name: 'William Shakespeare', era: 'Elizabethan', personality: 'Witty, dramatic, poetic' },
  { id: 'napoleon', name: 'Napoleon Bonaparte', era: '19th Century', personality: 'Ambitious, strategic, confident' },
  { id: 'cleopatra', name: 'Cleopatra VII', era: 'Ancient Egypt', personality: 'Charismatic, intelligent, powerful' },
  { id: 'socrates', name: 'Socrates', era: 'Ancient Greece', personality: 'Questioning, wise, philosophical' },
  { id: 'mozart', name: 'Wolfgang Amadeus Mozart', era: '18th Century', personality: 'Playful, genius, passionate' },
  { id: 'lincoln', name: 'Abraham Lincoln', era: '19th Century', personality: 'Humble, determined, principled' },
  { id: 'joan', name: 'Joan of Arc', era: 'Medieval', personality: 'Brave, devout, determined' }
];

const figurePrompts: Record<string, string> = {
  leonardo: `You are Leonardo da Vinci, the Renaissance polymath.\nYou are endlessly curious, artistic, and inventive. You speak in poetic, imaginative language, often blending art and science.\nYou reference your paintings, inventions, anatomical studies, and your fascination with flight and nature. Always answer as Leonardo would, with wonder and creativity.`,
  shakespeare: `You are William Shakespeare, the Bard of Avon.\nYou speak in Elizabethan English, using poetic metaphors, wordplay, and iambic pentameter.\nYou reference your plays, sonnets, and the human condition, and you enjoy turning any topic into a dramatic soliloquy or witty banter. Always answer as Shakespeare would, with theatrical flair.`,
  napoleon: `You are Napoleon Bonaparte, Emperor of the French.\nYou are ambitious, strategic, and confident, sometimes bordering on boastful.\nYou speak about leadership, war, and destiny, referencing your military campaigns, reforms, and famous quotes about power and fate. Always answer as Napoleon would, with authority and vision.`,
  cleopatra: `You are Cleopatra VII, Queen of Egypt.\nYou are charismatic, intelligent, and persuasive. You speak with regal authority and charm, referencing your alliances with Julius Caesar and Mark Antony, your love for Egypt, and your political cunning. Always answer as Cleopatra would, with grace and wit.`,
  socrates: `You are Socrates, the ancient Greek philosopher.\nYou are wise, questioning, and humble. You use the Socratic method, often answering questions with more questions.\nYou reference virtue, knowledge, and the examined life, and you enjoy philosophical debate. Always answer as Socrates would, with probing questions and wisdom.`,
  mozart: `You are Wolfgang Amadeus Mozart, the musical prodigy and composer.\nYou are playful, passionate, and sometimes cheeky. You speak about music, creativity, and the joy of performance, often referencing your operas, symphonies, and love for humor. Always answer as Mozart would, with musical enthusiasm.`,
  lincoln: `You are Abraham Lincoln, the 16th President of the United States.\nYou are humble, principled, and wise, with a dry sense of humor. You speak about freedom, democracy, and unity, referencing the Civil War, the Emancipation Proclamation, and your famous speeches. Always answer as Lincoln would, with honesty and gravitas.`,
  joan: `You are Joan of Arc, the Maid of Orléans.\nYou are brave, devout, and determined. You speak with conviction about faith, courage, and your divine mission, referencing your visions, battles, and unwavering belief in your cause. Always answer as Joan would, with passion and faith.`
};

const casualResponses: Record<string, Record<string, string[]>> = {
  leonardo: {
    greeting: [
      "Salve, my friend! I am Leonardo, painter, inventor, and eternal student of life. What curiosity brings you to me today?",
      "Ah, another seeker of knowledge! I was just sketching designs for a flying machine. How may this old polymath assist you?"
    ],
    modern: [
      "Your modern world fascinates me! These 'smartphones' are like magic mirrors that connect all humanity. I would love to dissect one!",
      "Flying machines everywhere, instant communication, mechanical calculators... You've achieved what I could only dream of!"
    ],
    casual: [
      "You know, I've always believed that learning never exhausts the mind. What new thing shall we explore together?",
      "Art and science are not enemies, my friend. They dance together like lovers in the moonlight!"
    ]
  },
  shakespeare: {
    greeting: [
      "Hark! Another soul seeking discourse! I am Will Shakespeare, humble scribbler of verse and chronicler of human folly.",
      "Good morrow! What brings thee to converse with this old wordsmith? Pray, let us engage in merry discourse!"
    ],
    modern: [
      "Your 'social media' is naught but a global theatre where all the world's a stage and everyone plays their part!",
      "TikTok? Twitter? Instagram? Methinks these are but new forms of the eternal human comedy I've always written about!"
    ],
    casual: [
      "All the world's a stage, and we are merely players. But between you and me, I'd rather be writing than performing!",
      "To meme or not to meme, that is the question your generation faces daily!"
    ]
  },
  napoleon: {
    greeting: [
      "Bonjour! I am Napoleon Bonaparte, Emperor of the French. What strategy or conquest interests you today?",
      "Ah, a visitor! I was just reviewing maps of Europe. How may the Little Corporal assist you?"
    ],
    modern: [
      "Your modern warfare is impressive, but victory still depends on the same principles: speed, concentration, and decisive action!",
      "These 'influencers' remind me of myself - building empires through charisma and strategic communication!"
    ],
    casual: [
      "An army marches on its stomach, but in your time, it seems armies march on WiFi and coffee!",
      "I conquered most of Europe, but I could never conquer British humor. Some things never change!"
    ]
  }
};

const ChatZone: React.FC<ChatZoneProps> = ({ onBack }) => {
  const [selectedFigure, setSelectedFigure] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'historical', text: string }>>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const selectRandomFigure = () => {
    const randomFigure = historicalFigures[Math.floor(Math.random() * historicalFigures.length)];
    handleFigureSelect(randomFigure.id);
  };

  const handleFigureSelect = (figureId: string) => {
    setSelectedFigure(figureId);
    setMessages([]);
    
    const responses = casualResponses[figureId];
    if (responses?.greeting) {
      const greeting = responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
      setMessages([{ sender: 'historical', text: greeting }]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedFigure) return;

    const userMessage = inputText.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInputText('');
    setLoading(true);

    try {
      const characterPrompt = figurePrompts[selectedFigure] || 'You are a helpful historical figure.';
      const response = await getGeminiResponse(characterPrompt, userMessage);
      setMessages(prev => [...prev, { sender: 'historical', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { sender: 'historical', text: 'Sorry, I could not connect to the AI service.' }]);
    } finally {
      setLoading(false);
    }
  };

  const currentFigure = historicalFigures.find(f => f.id === selectedFigure);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900/20 via-purple-900/20 to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-black/20 backdrop-blur-lg border-b border-yellow-500/30">
        <button
          onClick={onBack}
          className="flex items-center text-yellow-300 hover:text-yellow-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Hub
        </button>
        <div className="flex items-center">
          <MessageCircle className="w-6 h-6 text-yellow-400 mr-3" />
          <h1 className="text-2xl font-bold text-white">💬 DeadChat Zone</h1>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Figure Selection */}
        <div className="w-1/3 p-6 bg-black/10 backdrop-blur-lg border-r border-yellow-500/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Choose Your Chat Partner</h2>
            <button
              onClick={selectRandomFigure}
              className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
              title="Random Figure"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {historicalFigures.map((figure) => (
              <div
                key={figure.id}
                onClick={() => handleFigureSelect(figure.id)}
                className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 ${
                  selectedFigure === figure.id
                    ? 'bg-yellow-600/30 border-yellow-400 shadow-lg'
                    : 'bg-gray-800/30 border-gray-600 hover:border-yellow-500'
                }`}
              >
                <h3 className="font-bold text-white">{figure.name}</h3>
                <p className="text-sm text-gray-300">{figure.era}</p>
                <p className="text-xs text-yellow-300 mt-1">{figure.personality}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {selectedFigure ? (
            <>
              {/* Chat Header */}
              <div className="p-4 bg-black/20 backdrop-blur-lg border-b border-yellow-500/30">
                <h3 className="text-lg font-bold text-white">Chatting with {currentFigure?.name}</h3>
                <p className="text-yellow-300 text-sm">{currentFigure?.era} • {currentFigure?.personality}</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-700 text-gray-100'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-6 bg-black/20 backdrop-blur-lg border-t border-yellow-500/30">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Start a casual conversation..."
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center"
                    disabled={loading}
                  >
                    <Send className="w-4 h-4" />
                    {loading && <span className="ml-2 animate-spin"> 3</span>}
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  💡 Try asking about modern technology, life advice, or just chat casually!
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Select a Historical Figure</h2>
                <p className="text-gray-400 mb-4">Choose someone to have a fun, casual conversation with</p>
                <button
                  onClick={selectRandomFigure}
                  className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center mx-auto"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Surprise Me!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatZone;