// Gemini API utility for frontend to call backend proxy

export async function getGeminiResponse(characterPrompt: string, userMessage: string) {
  const response = await fetch('http://localhost:5001/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ characterPrompt, userMessage })
  });
  if (!response.ok) {
    throw new Error('Failed to fetch from Gemini proxy');
  }
  const data = await response.json();
  return data.text;
}   