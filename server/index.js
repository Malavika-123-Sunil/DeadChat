const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 5001;

// List of Gemini API keys
const GEMINI_API_KEYS = [
  'AIzaSyAVode7qKnvGoc4Hs0m144AGDf1pe68IPY',
  'AIzaSyB9xIzeMG6TZmPfDpU2n48BELwHDQ0OL-0',
  'AIzaSyD8vwgtBxMJubvbDPu3DRUkxG3tI4x-uwk'
];

function getRandomGeminiKey() {
  return GEMINI_API_KEYS[Math.floor(Math.random() * GEMINI_API_KEYS.length)];
}

app.use(cors());
app.use(bodyParser.json());

app.post('/api/gemini', async (req, res) => {
  const { characterPrompt, userMessage } = req.body;
  if (!characterPrompt || !userMessage) {
    return res.status(400).json({ error: 'Missing characterPrompt or userMessage' });
  }
  try {
    const apiKey = getRandomGeminiKey();
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${characterPrompt}\nUser: ${userMessage}\nAI:`
    });
    res.json({ text: response.text });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to connect to Gemini API', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Gemini proxy server running on port ${PORT}`);
}); 