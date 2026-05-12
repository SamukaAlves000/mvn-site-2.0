import { Injectable } from '@angular/core';
import { GoogleGenAI } from "@google/genai";
import knowledgeBase from '../data/knowledge-base.json';

declare const GEMINI_API_KEY: string;

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }

  async generateDiagnostic(leadData: any): Promise<string> {
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
