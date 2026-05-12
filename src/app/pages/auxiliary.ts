import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-services', 
  standalone: true, 
  imports: [CommonModule, MatIconModule], 
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="py-24 px-6 md:px-12 max-w-7xl mx-auto">
    <h1 class="text-5xl font-bold mb-12 animate-item">Detalhamento <span class="text-soph-gold italic">Técnico</span></h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div class="glass-panel p-10 rounded-xl border-l-4 border-inst-blue animate-item">
        <h2 class="text-2xl font-bold mb-6 text-inst-blue">Engenharia e SST</h2>
        <ul class="space-y-4 text-gray-400">
          <li class="flex items-start gap-3"><span class="text-soph-gold">■</span> PGR: Programa de Gerenciamento de Riscos</li>
          <li class="flex items-start gap-3"><span class="text-soph-gold">■</span> LTCAT: Laudo das Condições Ambientais do Trabalho</li>
          <li class="flex items-start gap-3"><span class="text-soph-gold">■</span> PCMSO e Ergonomia de Campo</li>
        </ul>
      </div>
      <div class="glass-panel p-10 rounded-xl border-l-4 border-inst-blue animate-item">
        <h2 class="text-2xl font-bold mb-6 text-inst-blue">Compliance e ESG</h2>
        <ul class="space-y-4 text-gray-400">
          <li class="flex items-start gap-3"><span class="text-soph-gold">■</span> Licenciamento Ambiental Complexo (LP, LI, LO)</li>
          <li class="flex items-start gap-3"><span class="text-soph-gold">■</span> Auditorias de Terceira Parte e Due Diligence</li>
          <li class="flex items-start gap-3"><span class="text-soph-gold">■</span> Estruturação de Comitês de Ética e Integridade</li>
        </ul>
      </div>
    </div>
  </div>`
}) 
export class Services {}

@Component({
  selector: 'app-about', 
  standalone: true, 
  imports: [CommonModule], 
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
    <div class="w-full md:w-1/2 rounded-xl overflow-hidden border border-white/5 shadow-2xl">
      <img src="https://i.ibb.co/bjHn0kzL/Gemini-Generated-Image-mvj9szmvj9szmvj9.png" class="w-full h-full object-cover animate-cinematic-breathe" alt="Consulting Team"/>
    </div>
    <div class="w-full md:w-1/2">
      <h1 class="text-5xl font-bold mb-8 italic">A Autoridade MVN</h1>
      <p class="text-gray-400 leading-relaxed mb-6">
        Nascemos da necessidade de um posicionamento técnico real no agronegócio. Não somos apenas consultores; somos engenheiros do compliance. 
        Zero missão/visão genéricas. Nosso foco é a resolução de problemas complexos que travam o crescimento de grandes produtores e indústrias.
      </p>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white/5 p-4 rounded border-l-2 border-soph-gold"><p class="text-xs uppercase font-bold mb-1">Preparo Real</p><p class="text-[10px] text-gray-500">Foco em fiscalizações reais.</p></div>
        <div class="bg-white/5 p-4 rounded border-l-2 border-soph-gold"><p class="text-xs uppercase font-bold mb-1">Visão Agro</p><p class="text-[10px] text-gray-500">100% focado no campo e indústria.</p></div>
      </div>
    </div>
  </div>`
}) 
export class About {}

@Component({
  selector: 'app-contact', 
  standalone: true, 
  imports: [CommonModule, MatIconModule], 
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
    <h1 class="text-5xl font-bold mb-12">Conversão <span class="text-inst-red italic">Estratégica</span></h1>
    <div class="glass-panel p-12 rounded-3xl max-w-xl mx-auto border-inst-red/20 shadow-[0_0_50px_rgba(185,28,28,0.1)]">
      <div class="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
        <mat-icon class="text-green-500 text-5xl">whatsapp</mat-icon>
      </div>
      <p class="text-gray-300 mb-12 text-sm leading-relaxed">
        Sua empresa está preparada para auditorias, fiscalizações e exigências regulatórias? <br/>Fale agora com nosso consultor sênior.
      </p>
      <div class="space-y-4">
        <a href="https://wa.link/t4h1bn" target="_blank" class="block bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1">
          Iniciar Atendimento via WhatsApp
        </a>
        <p class="text-[10px] text-gray-600 uppercase font-bold tracking-widest italic">Tempo médio de resposta: 15 minutos</p>
      </div>
    </div>
  </div>`
}) 
export class Contact {}
