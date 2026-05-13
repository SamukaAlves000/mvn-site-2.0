import { Handler } from '@netlify/functions';
import { GoogleGenAI } from '@google/genai';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const apiKey = process.env['GEMINI_API_KEY'];
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'GEMINI_API_KEY not configured' }) };
  }

  let type: string;
  let payload: any;

  try {
    const body = JSON.parse(event.body || '{}');
    type = body.type;
    payload = body.payload;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!payload) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing payload' }) };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });          // ← objeto, não string
    const modelName = payload.model || 'gemini-2.5-flash';

    if (type === 'diagnostic') {
      const response = await ai.models.generateContent({   // ← ai.models, não getGenerativeModel
        model: modelName,
        contents: payload.prompt,
        config: { systemInstruction: payload.systemInstruction },
      });
      return { statusCode: 200, body: JSON.stringify({ text: response.text }) };
    }

    if (type === 'chat') {
      const chat = await ai.chats.create({               // ← ai.chats.create, não startChat
        model: modelName,
        config: { systemInstruction: payload.systemInstruction },
        history: (payload.history || []).map((h: any) => ({
          role: h.role,
          parts: h.parts,
        })),
      });
      const response = await chat.sendMessage({ message: payload.message });
      return { statusCode: 200, body: JSON.stringify({ text: response.text }) };
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid type' }) };

  } catch (error: any) {
    console.error('Gemini error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

export { handler };