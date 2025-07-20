# DeadChat 🚀

**Connect with history's greatest minds, witness epic intellectual battles, and communicate with mysterious spirits from beyond!**

DeadChat is an interactive web application that brings historical figures and scientists to life through AI-powered conversations. Chat with Einstein about relativity, debate with Shakespeare, or summon spirits through a digital Ouija board.

## ✨ Features

### 🧠 Time-Travel Tutoring
- **Learn from legendary scientists:** Einstein, Tesla, Newton, Curie, Darwin, Galileo
- **Personalized responses:** Each scientist responds in their unique style and expertise
- **Educational conversations:** Get insights into their discoveries and philosophies

### ⚔️ Debate Arena
- **Watch epic intellectual battles** between history's greatest minds
- **Choose debaters and topics** for simulated debates
- **Real-time debate simulation** with character-specific arguments

### 💬 Random Chat Zone
- **Chat with historical figures:** Leonardo da Vinci, Shakespeare, Napoleon, Cleopatra, Socrates, Mozart, Lincoln, Joan of Arc
- **Casual conversations** with unique personalities
- **Modern perspective:** See how historical figures would react to today's world

### 👻 Spirit Hojo Board
- **Digital Ouija board experience** with mystical atmosphere
- **Spirit communication** through cryptic, poetic responses
- **Interactive summoning ritual** with questions and name revelation

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for modern, responsive styling
- **Lucide React** for beautiful icons

### Backend
- **Node.js** with Express
- **Google Gemini AI** for intelligent character responses
- **CORS** enabled for cross-origin requests
- **Environment variables** for secure API key management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API keys

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd DeadChat
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_BACKEND_URL=http://localhost:5001
   ```
   
   Create a `.env` file in the `server` directory:
   ```env
   GEMINI_API_KEY_1=your_first_api_key
   GEMINI_API_KEY_2=your_second_api_key
   GEMINI_API_KEY_3=your_third_api_key
   ```

5. **Start the backend server**
   ```bash
   cd server
   npm start
   ```

6. **Start the frontend development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173`

## 🌐 Deployment

### Deploy to Render

#### Backend Deployment
1. Go to [Render.com](https://render.com) and create an account
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure settings:
   - **Name:** `deadchat-backend`
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables:
   - `GEMINI_API_KEY_1`
   - `GEMINI_API_KEY_2`
   - `GEMINI_API_KEY_3`
6. Click "Create Web Service"

#### Frontend Deployment
1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure settings:
   - **Name:** `deadchat-frontend`
   - **Root Directory:** `.`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Add environment variable:
   - `VITE_BACKEND_URL`: `https://your-backend-name.onrender.com`
5. Click "Create Static Site"

## 🎭 Character Personalities

### Scientists (Tutoring Room)
- **Einstein:** Warm, witty, uses analogies about trains and clocks
- **Tesla:** Passionate, poetic, visionary about electricity and future
- **Newton:** Logical, precise, formal, references laws of motion
- **Curie:** Humble, thoughtful, passionate about discovery
- **Darwin:** Observant, patient, gentle, discusses evolution
- **Galileo:** Inquisitive, bold, questions authority

### Historical Figures (Chat Zone)
- **Leonardo da Vinci:** Curious, artistic, blends art and science
- **Shakespeare:** Poetic, Elizabethan English, dramatic flair
- **Napoleon:** Ambitious, strategic, confident, authoritative
- **Cleopatra:** Charismatic, intelligent, regal authority
- **Socrates:** Wise, questioning, uses Socratic method
- **Mozart:** Playful, passionate, musical enthusiasm
- **Lincoln:** Humble, principled, honest, gravitas
- **Joan of Arc:** Brave, devout, passionate about faith

### Spirit (Hojo Board)
- **Mysterious spirit:** Cryptic, poetic, supernatural, riddles

## 🔧 Configuration

### API Keys
The application uses Google Gemini AI for generating character responses. You need to:
1. Get API keys from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add them as environment variables in your backend

### Customizing Characters
To modify character personalities, edit the prompt objects in:
- `src/components/TutoringRoom.tsx` (scientists)
- `src/components/ChatZone.tsx` (historical figures)
- `src/components/HojoBoard.tsx` (spirit)

### Response Length
All characters are configured to give concise responses (2-3 sentences maximum) for better user experience.

## 📁 Project Structure

```
DeadChat/
├── src/
│   ├── components/
│   │   ├── HomePage.tsx          # Main navigation hub
│   │   ├── TutoringRoom.tsx      # Scientist chat interface
│   │   ├── DebateArena.tsx       # Debate simulation
│   │   ├── ChatZone.tsx          # Historical figures chat
│   │   └── HojoBoard.tsx         # Spirit board interface
│   ├── gemini.ts                 # API utility functions
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # App entry point
├── server/
│   ├── index.js                  # Express backend server
│   └── package.json              # Backend dependencies
├── package.json                  # Frontend dependencies
└── README.md                     # This file
```

## 🎨 Customization

### Adding New Characters
1. Add character data to the appropriate array (scientists, historical figures, etc.)
2. Create a detailed prompt in the prompts object
3. Update the UI to include the new character

### Styling
The app uses TailwindCSS for styling. You can customize:
- Colors and themes in `tailwind.config.js`
- Component-specific styles in each `.tsx` file
- Global styles in `src/index.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powering the intelligent conversations
- **React** and **Vite** for the amazing development experience
- **TailwindCSS** for the beautiful, responsive design
- **Historical figures** who continue to inspire us

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-username/DeadChat/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

**🌟 Where History Comes Alive & Spirits Speak 🌟**

*Built with ❤️ and a touch of magic* 
### Screen Record:
https://drive.google.com/file/d/1KDu564hL1JMuNEwYOXJEAtdTLbre2t8s/view?usp=sharing

