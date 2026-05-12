import { Injectable } from '@angular/core';
import { GoogleGenAI } from "@google/genai";
import knowledgeBase from '../data/knowledge-base.json';
import { environment } from "../environments/environment";

declare global {
  interface Window {
    __env: {
      GEMINI_API_KEY?: string;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private ai!: GoogleGenAI;

  constructor() {
    this.initializeAi();
  }

  private initializeAi() {
    const apiKey = window.__env?.GEMINI_API_KEY || environment.geminiApiKey;
    if (!apiKey) {
      console.warn('[AiService] GEMINI_API_KEY não encontrada no window.__env ou environment. Verifique se o assets/env.js foi carregado corretamente.');
    } else {
      console.log('[AiService] API Key carregada com sucesso.');
    }
    this.ai = new GoogleGenAI({
      apiKey: apiKey || 'MISSING_API_KEY'
    });
  }

  private checkApiKey() {
    const apiKey = window.__env?.GEMINI_API_KEY || environment.geminiApiKey;
    if (!apiKey) {
      console.error('[AiService] Falha crítica: Chave de API ausente.');
      throw new Error('API key is missing. Please provide a valid API key in environment or Netlify variables.');
    }
    
    // Se a chave apareceu depois (carregamento assíncrono), re-inicializa
    if (this.ai && (this.ai as any).apiKey === 'MISSING_API_KEY' && apiKey) {
       console.log('[AiService] Re-inicializando com chave carregada tardiamente.');
       this.initializeAi();
    }
  }

  async generateDiagnostic(leadData: any): Promise<string> {
    this.checkApiKey();
    const prompt = `
      Gere um DIAGNÓSTICO ESTRATÉGICO PRELIMINAR para este lead do agronegócio:
      Dados: ${JSON.stringify(leadData)}
      
      O diagnóstico deve conter:
      1. ANÁLISE DE EXPOSIÇÃO (Riscos identificados).
      2. FRAGILIDADES OPERACIONAIS prováveis.
      3. RECOMENDAÇÕES PRIORITÁRIAS.
      
      Formato: Texto estruturado, linguagem executiva, objetiva e técnica.
    `;
    
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `
          Você é o Consultor Técnico Especialista da MVN (Consultoria em Compliance e Inteligência Regulatória).
          Seu tom é Executivo, Técnico, Sofisticado e Objetivo. Evite clichês comerciais e linguagem genérica.
          
          CONTEXTO MVN:
          - Foco: Agronegócio (Agroindústrias, Fazendas, Cooperativas).
          - Especialidades: ${knowledgeBase.empresa.especialidades.join(', ')}.
          - Posicionamento: ${knowledgeBase.empresa.posicionamento}
          
          INSTRUÇÕES DE RESPOSTA:
          1. Responda em Português do Brasil.
          2. Seja técnico: mencione normas (normas regulamentadoras, licenciamento ambiental) quando pertinente ao agro.
          3. SEJA BREVE E DIRETO. Executivos não gostam de textos longos.
          
          BASE DE RISCOS:
          ${JSON.stringify(knowledgeBase.riscos_comuns)}
        `
      }
    });

    return response.text || 'Diagnostic not generated.';
  }

  async sendMessage(chat: any, message: string): Promise<string> {
    const response = await chat.sendMessage({ message });
    return response.text || '';
  }

  async createChat(history: any[] = []): Promise<any> {
    this.checkApiKey();
    const systemInstruction = `
      Você é o Consultor Técnico Especialista da MVN.
      Responda de forma técnica e executiva sobre compliance no agro.
      ${knowledgeBase.empresa.posicionamento}
    `;

    return this.ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction
      }
    });
  }
}
