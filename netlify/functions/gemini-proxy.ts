import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Nota: O pacote no Netlify pode variar, mas @google/generative-ai é o padrão atual.
// Se o projeto usa @google/genai, certifique-se de instalar o correspondente.

const handler: Handler = async (event) => {
  // Validação de método HTTP (apenas POST)
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const apiKey = process.env['GEMINI_API_KEY'];
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GEMINI_API_KEY not configured' }),
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const body = JSON.parse(event.body || '{}');
    const { type, payload } = body;

    // Configuração do modelo (usando o mesmo do serviço original)
    const model = genAI.getGenerativeModel({
      model: payload.model || 'gemini-1.5-flash', // Fallback seguro
      systemInstruction: payload.systemInstruction,
    });

    if (type === 'diagnostic') {
      // Endpoint: Geração de diagnóstico estratégico
      const result = await model.generateContent(payload.prompt);
      const response = await result.response;
      return {
        statusCode: 200,
        body: JSON.stringify({ text: response.text() }),
      };
    } 
    
    if (type === 'chat') {
      // Endpoint: Envio de mensagem de chat
      const chat = model.startChat({
        history: payload.history || [],
      });
      const result = await chat.sendMessage(payload.message);
      const response = await result.response;
      return {
        statusCode: 200,
        body: JSON.stringify({ text: response.text() }),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request type' }),
    };
  } catch (error: any) {
    console.error('Error in gemini-proxy:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
};

export { handler };
