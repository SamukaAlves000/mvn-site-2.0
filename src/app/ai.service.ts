import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import knowledgeBase from '../data/knowledge-base.json';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = '/.netlify/functions/gemini-proxy'; // ← direto, sem /api/

  constructor(private http: HttpClient) {}

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

    const systemInstruction = `
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
    `;

    try {
      const response: any = await firstValueFrom(
        this.http.post(this.apiUrl, {
          type: 'diagnostic',
          payload: {
            model: 'gemini-2.5-flash',
            prompt,
            systemInstruction
          }
        })
      );

      return response.text || 'Diagnostic not generated.';
    } catch (error) {
      console.error('Error generating diagnostic:', error);
      return 'Erro ao gerar diagnóstico. Tente novamente mais tarde.';
    }
  }

  async sendMessage(chat: any, message: string): Promise<string> {
    return chat.sendMessage(message);
  }

  async createChat(history: any[] = []): Promise<any> {
    const systemInstruction = `
      Você é o Consultor Técnico Especialista da MVN.
      Responda de forma técnica e executiva sobre compliance no agro.
      ${knowledgeBase.empresa.posicionamento}
    `;

    // Retorna um objeto que imita o comportamento do chat original
    return {
      sendMessage: async (message: string) => {
        try {
          const response: any = await firstValueFrom(
            this.http.post(this.apiUrl, {
              type: 'chat',
              payload: {
                model: 'gemini-2.5-flash',
                message,
                history,
                systemInstruction
              }
            })
          );
          // Atualiza o histórico local se necessário (simplificado aqui)
          history.push({ role: 'user', parts: [{ text: message }] });
          history.push({ role: 'model', parts: [{ text: response.text }] });
          return response.text;
        } catch (error) {
          console.error('Error in chat sendMessage:', error);
          throw error;
        }
      }
    };
  }
}
