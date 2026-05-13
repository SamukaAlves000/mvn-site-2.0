import { ChangeDetectionStrategy, Component, signal, OnInit, ElementRef, viewChild, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AiService } from '../ai.service';
import { animate, stagger } from 'motion';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section -->
    <section class="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden border-b border-soph-gold/10 pb-32 md:pb-40">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://i.ibb.co/xSxmT17T/Chat-GPT-Image-12-de-mai-de-2026-09-14-33.png" 
          alt="Agroindustrial Plant" 
          class="w-full h-full object-cover object-center md:object-center opacity-70 grayscale-0 brightness-50 scale-110 md:scale-100"
          referrerpolicy="no-referrer"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-premium-black via-transparent to-premium-black"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="animate-item flex flex-col items-center mb-10">
          <p class="text-white text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
            Compliance, Engenharia e <br class="hidden md:block"/>
            Inteligência Regulatória para o Agronegócio
          </p>
<!--          <div class="h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-soph-gold/50 to-transparent my-6"></div>-->
<!--          <p class="text-soph-gold text-sm md:text-xl font-medium tracking-[0.2em] uppercase">-->
<!--            Soluções integradas em ESG, SST, Engenharia, Governança e Gestão Regulatória-->
<!--          </p>-->
        </div>

        <div class="animate-item flex flex-col items-center mt-10">
          <!-- Tech Timeline UI from image -->
          <div class="relative w-full max-w-3xl">
             <div class="h-12 w-full glass-panel border-soph-gold/20 relative flex items-center justify-center overflow-hidden" 
                  style="clip-path: polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%);">
                <div class="absolute inset-0 bg-soph-gold/5 animate-pulse"></div>
                <div class="absolute inset-x-0 h-[1px] bg-soph-gold/30 top-0"></div>
                <div class="absolute inset-x-0 h-[1px] bg-soph-gold/30 bottom-0"></div>
                <span class="relative z-10 text-[10px] md:text-xs text-soph-gold font-bold uppercase tracking-[0.3em]">
                  Soluções integradas em ESG, SST, Engenharia, Governança e Gestão Regulatória
                </span>
             </div>
             <!-- Connecting Lines -->
             <div class="absolute -left-20 top-1/2 w-20 h-[1px] bg-soph-gold/30 hidden md:block"></div>
             <div class="absolute -right-20 top-1/2 w-20 h-[1px] bg-soph-gold/30 hidden md:block"></div>
             <div class="absolute -left-20 top-1/2 -mt-4 w-4 h-8 border-l border-t border-soph-gold/30 hidden md:block"></div>
             <div class="absolute -right-20 top-1/2 -mt-4 w-4 h-8 border-r border-t border-soph-gold/30 hidden md:block"></div>
          </div>
        </div>

        <div class="animate-item mt-15 flex flex-col md:flex-row items-center justify-center gap-8">
          <button routerLink="/diagnostico" class="btn-primary">
            Acessar Protocolo de Diagnóstico
          </button>
          <button routerLink="/contato" class="btn-secondary">
            Conferência Executiva
          </button>
        </div>
      </div>

      <!-- Trust Bar -->
      <div class="animate-item absolute bottom-0 left-1/2 -translate-x-1/2 w-full border-t border-white/5 bg-premium-black-soft/50 py-6">
        <div class="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500">
          <div class="flex flex-col items-center gap-1">
            <span class="text-white text-base">+10 anos de atuação</span>
          </div>
          <div class="border-x border-white/10 flex flex-col items-center gap-1">
            <span class="text-white text-base">+500 projetos</span>
          </div>
          <div class="flex flex-col items-center gap-1 text-center">
            <span class="text-white text-base">Foco em compliance agro</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Solutions Ecosystem -->
    <section class="py-32 px-6 md:px-12 bg-premium-black relative">
       <div class="absolute top-0 right-0 w-96 h-96 bg-inst-blue/5 blur-[120px] rounded-full"></div>
       <div class="absolute bottom-0 left-0 w-96 h-96 bg-soph-gold/5 blur-[120px] rounded-full"></div>

      <div class="max-w-7xl mx-auto text-center mb-24">
        <div class="inline-block p-1 bg-white/5 rounded-full mb-6">
           <div class="px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-soph-gold flex items-center gap-2">
             <span class="w-1 h-1 rounded-full bg-soph-gold animate-pulse"></span>
             Engenharia Regulatória 4.0
           </div>
        </div>
        <h2 class="text-4xl md:text-6xl font-bold mb-6 italic">Ecossistema de Soluções</h2>
        <p class="text-gray-500 text-lg max-w-2xl mx-auto">Proteção estratégica e compliance técnico para a continuidade e expansão do seu agronegócio.</p>
      </div>

      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          @for (service of mainServices; track service.title) {
            <div class="relative group">
                <div class="glass-panel p-10 rounded-lg border-white/5 hover:border-soph-gold/30 transition-all duration-700 hover:-translate-y-2 h-full flex flex-col items-center text-center">
                  <div class="w-16 h-16 hexa-shape bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-soph-gold group-hover:text-black transition-all duration-500">
                    <mat-icon class="text-soph-gold group-hover:text-black text-3xl leading-none">{{service.icon}}</mat-icon>
                  </div>
                  <h3 class="text-lg font-bold mb-4 uppercase tracking-tighter">{{service.title}}</h3>
                  <p class="text-gray-500 text-[11px] leading-relaxed mb-6">
                    {{service.description}}
                  </p>
                  <div class="mt-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span class="text-[9px] font-bold text-soph-gold uppercase tracking-widest">Ver Norma Técnica</span>
                    <mat-icon class="text-[12px] text-soph-gold">north_east</mat-icon>
                  </div>
                </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Operating Segments -->
    <section class="py-32 px-6 md:px-12 bg-premium-black relative overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h4 class="text-soph-gold text-xs font-bold uppercase tracking-[0.4em] mb-4">Expertise Setorial</h4>
            <h2 class="text-4xl md:text-6xl font-bold mb-8 italic">Segmentos de Atuação</h2>
            <p class="text-gray-400 text-lg mb-12 font-light leading-relaxed">
              Atuamos nos pilares fundamentais da cadeia produtiva, garantindo que cada elo esteja em conformidade com as exigências nacionais e internacionais.
            </p>
            
            <div class="space-y-6">
              @for (segment of segments; track segment.title) {
                <div class="group border-b border-white/5 pb-6 hover:border-soph-gold/30 transition-all cursor-default">
                  <div class="flex items-center justify-between">
                    <h5 class="text-xl font-medium text-gray-300 group-hover:text-white transition-colors">{{segment.title}}</h5>
                    <mat-icon class="text-soph-gold opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">chevron_right</mat-icon>
                  </div>
                </div>
              }
            </div>
          </div>
          
          <div class="relative">
            <div class="aspect-[4/5] rounded-2xl overflow-hidden glass-panel p-2">
              <img 
                src="https://i.ibb.co/gFbCSqkC/Chat-GPT-Image-12-de-mai-de-2026-10-02-17.png" 
                alt="Agro Tech" 
                class="w-full h-full object-cover rounded-xl animate-cinematic-breathe"
                referrerpolicy="no-referrer"
              />
            </div>
            <!-- Floating Data Point -->
            <div class="absolute -bottom-10 -left-10 glass-panel p-8 rounded-xl border-soph-gold/20 animate-bounce duration-[3000ms]">
               <p class="text-soph-gold text-3xl font-bold mb-1">98%</p>
               <p class="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Índice de Aprovação Regulatória</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Strategic Differentials -->
    <section class="py-32 px-6 md:px-12 bg-premium-black-soft border-y border-white/5">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center gap-6 mb-20">
          <h2 class="text-4xl md:text-6xl font-bold tech-border-gold uppercase tracking-tighter leading-none">Diferenciais <br/> Estratégicos</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          @for (diff of differentials; track diff.title) {
            <div class="glass-panel p-12 rounded-xl border-white/5 hover:border-soph-gold/20 transition-all duration-500 group">
              <div class="mb-8 p-4 w-fit rounded-lg bg-soph-gold/5 border border-soph-gold/10 group-hover:bg-soph-gold group-hover:text-black transition-all duration-500">
                <mat-icon class="text-soph-gold group-hover:text-black">{{diff.icon}}</mat-icon>
              </div>
              <h4 class="text-xl font-bold mb-6 italic">{{diff.title}}</h4>
              <p class="text-gray-500 text-sm leading-relaxed">{{diff.description}}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Bot de Consulta Técnica (Floating) -->
    <div class="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      @if (chatOpen()) {
        <div class="glass-panel w-80 md:w-96 rounded-xl shadow-2xl flex flex-col h-[500px]">
          <div class="p-4 bg-inst-blue/10 border-b border-white/5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-inst-blue flex items-center justify-center">
                <mat-icon class="text-sm">psychology</mat-icon>
              </div>
              <div>
                <p class="text-xs font-bold uppercase leading-none">MVN Tech Advisor</p>
                <p class="text-[10px] text-green-500 uppercase font-bold tracking-widest">Consultor IA Ativo</p>
              </div>
            </div>
            <button (click)="chatOpen.set(false)" class="text-gray-500 hover:text-white">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          
          <div class="flex-grow overflow-y-auto p-4 space-y-4" #chatScroll>
            <div class="bg-white/5 p-3 rounded-lg text-xs leading-relaxed">
              Olá. Sou o Consultor Técnico da MVN. Em que área de compliance agro ou inteligência regulatória posso ajudar hoje?
            </div>
            @for (msg of chatMessages(); track msg.text) {
              <div [class]="msg.role === 'user' ? 'ml-auto bg-inst-blue/20 p-3 rounded-lg text-xs max-w-[80%]' : 'mr-auto bg-white/5 p-3 rounded-lg text-xs max-w-[80%]'">
                {{msg.text}}
              </div>
            }
          </div>

          <div class="p-4 border-t border-white/5 bg-premium-black-soft rounded-b-xl">
            <div class="flex gap-2">
              <input 
                #chatInput
                type="text" 
                placeholder="Exemplo: PGR para agroindústria..." 
                class="flex-grow bg-premium-black border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-soph-gold"
                (keyup.enter)="sendMessage(chatInput.value); chatInput.value = ''"
              />
              <button (click)="sendMessage(chatInput.value); chatInput.value = ''" class="bg-inst-blue p-2 rounded flex items-center justify-center">
                <mat-icon class="text-sm">send</mat-icon>
              </button>
            </div>
            <p class="text-[9px] text-gray-600 mt-2 text-center uppercase tracking-tighter">
              Análise preliminar. Não substitui avaliação técnica especializada.
            </p>
          </div>
        </div>
      }
      <button 
        (click)="chatOpen.set(!chatOpen())" 
        class="w-16 h-16 rounded-full bg-inst-blue flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all text-white border-2 border-inst-blue/50"
      >
        <mat-icon class="text-3xl">{{ chatOpen() ? 'close' : 'psychology' }}</mat-icon>
      </button>
    </div>
  `
})
export class Home implements OnInit {
  chatOpen = signal(false);
  chatMessages = signal<{role: 'user' | 'model', text: string}[]>([]);

    mainServices = [
        {
            title: 'Compliance Agroambiental',
            icon: 'eco',
            description: 'Gestão estratégica de passivos ambientais, CAR, licenciamentos e regularização de biomas de forma integral.'
        },

        {
            title: 'SST e Higiene Ocupacional',
            icon: 'health_and_safety',
            description: 'Estruturação técnica em saúde ocupacional, segurança do trabalho, programas preventivos e mitigação de riscos operacionais.'
        },

        {
            title: 'ESG e Governança',
            icon: 'account_balance',
            description: 'Implementação de práticas ESG, governança corporativa e conformidade estratégica voltadas ao agronegócio moderno.'
        },

        {
            title: 'Gestão Regulatória',
            icon: 'gavel',
            description: 'Gerenciamento integrado de requisitos legais, normas técnicas e adequações regulatórias para operações agroindustriais.'
        },

        {
            title: 'Auditorias e Fiscalizações',
            icon: 'fact_check',
            description: 'Auditorias técnicas, acompanhamento fiscalizatório e suporte especializado para redução de passivos e riscos legais.'
        },

        {
            title: 'Licenciamento Ambiental',
            icon: 'verified',
            description: 'Condução completa de processos de licenciamento ambiental, estudos técnicos e regularização junto aos órgãos competentes.'
        }
    ];

  differentials = [
    { title: 'Exclusividade Técnica', icon: 'verified', description: 'Metodologias validadas por mais de uma década de atuação direta no ecossistema do agro.' },
    { title: 'Visão 360° GRC', icon: 'query_stats', description: 'Integração real entre Governança, Riscos e Compliance em todas as escalas operacionais.' },
    { title: 'Autoridade Reguladora', icon: 'gavel', description: 'Profundo conhecimento das instâncias regulatórias e normativas que regem o setor agroindustrial.' },
    { title: 'Tecnologia Aplicada', icon: 'precision_manufacturing', description: 'Uso de ferramentas digitais proprietárias para monitoramento de vencimentos.' }
  ];

  segments = [
    { title: 'Agroindústrias' },
    { title: 'Cooperativas Agrícolas' },
    { title: 'Fazendas e Grupos Agrícolas' },
    { title: 'Tradings e Logística' }
  ];

  private aiService = inject(AiService);
  private chatSession: any;
  private platformId = inject(PLATFORM_ID);

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const items = document.querySelectorAll('.animate-item');
      animate(
        items,
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.15), duration: 0.8, ease: "easeOut" }
      );
    }
    
    this.chatSession = await this.aiService.createChat();
  }

  async sendMessage(text: string) {
    if (!text.trim()) return;
    this.chatMessages.update(msgs => [...msgs, { role: 'user', text }]);
    
    try {
      const response = await this.aiService.sendMessage(this.chatSession, text);
      this.chatMessages.update(msgs => [...msgs, { 
        role: 'model', 
        text: response
      }]);
    } catch (err) {
      console.error(err);
      this.chatMessages.update(msgs => [...msgs, { 
        role: 'model', 
        text: 'Houve uma falha na conexão técnica. Por favor, tente novamente.' 
      }]);
    }
  }
}
