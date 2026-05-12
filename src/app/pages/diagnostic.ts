import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LeadService } from '../lead.service';
import { AiService } from '../ai.service';
import { MatIconModule } from '@angular/material/icon';
import { animate } from 'motion';

@Component({
  selector: 'app-diagnostic',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="py-24 px-6 md:px-12 max-w-4xl mx-auto">
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Diagnóstico Estratégico <span class="text-soph-gold italic">Online</span></h1>
        <p class="text-gray-400">Análise técnica preliminar de riscos regulatórios e conformidade ESG para agroindústrias.</p>
      </div>

      @if (!result()) {
        <div class="glass-panel p-8 md:p-12 rounded-xl relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10">
            <mat-icon class="text-9xl">analytics</mat-icon>
          </div>

          <form [formGroup]="diagnosticForm" (ngSubmit)="onSubmit()" class="space-y-8 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-widest text-soph-gold">Nome Completo</label>
                <input formControlName="name" type="text" class="w-full bg-premium-black border border-white/10 rounded px-4 py-3 focus:border-soph-gold outline-none"/>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-widest text-soph-gold">Email Corporativo</label>
                <input formControlName="email" type="email" class="w-full bg-premium-black border border-white/10 rounded px-4 py-3 focus:border-soph-gold outline-none"/>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-widest text-soph-gold">Empresa / Operação</label>
                <input formControlName="company" type="text" class="w-full bg-premium-black border border-white/10 rounded px-4 py-3 focus:border-soph-gold outline-none"/>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-widest text-soph-gold">Tipo de Operação</label>
                <select formControlName="operationType" class="w-full bg-premium-black border border-white/10 rounded px-4 py-3 focus:border-soph-gold outline-none appearance-none">
                  <option value="Agroindústria">Agroindústria</option>
                  <option value="Cooperativa">Cooperativa</option>
                  <option value="Fazenda Industrial">Fazenda Industrial</option>
                  <option value="Revenda">Revenda</option>
                </select>
              </div>
            </div>

            <div class="space-y-6 pt-6 border-t border-white/5">
              <h3 class="text-lg font-bold">Perfil de Maturidade</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-4">
                  <label class="text-sm font-medium block">Possui passivos ambientais ou áreas de compensação pendentes?</label>
                  <div class="flex gap-4">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" formControlName="environmentalIssues" value="Sim" class="accent-soph-gold"/> Sim
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" formControlName="environmentalIssues" value="Não" class="accent-soph-gold"/> Não
                    </label>
                  </div>
                </div>

                <div class="space-y-4">
                  <label class="text-sm font-medium block">Última auditoria externa realizada há quanto tempo?</label>
                  <select formControlName="lastAudit" class="w-full bg-premium-black border border-white/10 rounded px-4 py-2 focus:border-soph-gold outline-none">
                    <option value="menos_1_ano">Menos de 1 ano</option>
                    <option value="1_a_3_anos">1 a 3 anos</option>
                    <option value="mais_3_anos">Mais de 3 anos</option>
                    <option value="nunca">Nunca realizou</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="pt-8">
              <button 
                type="submit" 
                [disabled]="diagnosticForm.invalid || loading()" 
                class="w-full btn-primary disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-3"
              >
                {{ loading() ? 'Processando Inteligência Técnica...' : 'Gerar Diagnóstico Preliminar' }}
                @if (loading()) {
                  <mat-icon class="animate-spin text-sm">sync</mat-icon>
                } @else {
                  <mat-icon class="text-sm">auto_awesome</mat-icon>
                }
              </button>
            </div>
          </form>
        </div>
      } @else {
        <div class="animate-item bg-premium-black-soft border border-soph-gold/30 rounded-xl overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.05)]">
          <div class="p-10 border-b border-white/5 relative">
            <div class="absolute top-0 right-0 p-8 hidden md:block">
              <div class="text-[9px] text-soph-gold font-bold uppercase tracking-[0.3em] border border-soph-gold/30 px-3 py-1 rounded">
                Confidencial | MVN Advisor
              </div>
            </div>
            
            <p class="text-soph-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Relatório Técnico Individualizado</p>
            <h2 class="text-3xl md:text-5xl font-bold mb-2 italic">Diagnóstico de Inteligência Regulatória</h2>
            <p class="text-gray-500 font-serif italic text-sm">Preparado exclusivamente para: {{ diagnosticForm.value.company }}</p>
          </div>

          <div class="p-10 md:p-16">
            <div class="grid grid-cols-2 gap-8 md:gap-20 mb-16 pb-12 border-b border-white/5">
              <div>
                <p class="text-[9px] text-gray-500 uppercase font-bold tracking-widest mb-2">Data de Emissão</p>
                <p class="text-xs border-l border-soph-gold pl-3">{{ today | date:'dd/MM/yyyy' }}</p>
              </div>
              <div>
                <p class="text-[9px] text-gray-500 uppercase font-bold tracking-widest mb-2">Status do Protocolo</p>
                <p class="text-xs border-l border-soph-gold pl-3 uppercase">EXECUTIVO / CONFIDENCIAL</p>
              </div>
            </div>

            <div class="prose prose-invert max-w-none prose-sm leading-relaxed text-gray-300 whitespace-pre-wrap font-serif text-lg">
              {{ result() }}
            </div>

            <div class="mt-20 bg-inst-red/5 border border-inst-red/20 p-8 rounded-lg flex flex-col md:flex-row items-center gap-8">
              <mat-icon class="text-inst-red text-6xl">warning_amber</mat-icon>
              <div>
                <h4 class="text-inst-red font-bold uppercase tracking-widest text-[10px] mb-2">Nota Técnica de Alerta</h4>
                <p class="text-gray-400 text-xs leading-relaxed italic">
                  Os riscos identificados acima possuem caráter preliminar sob a ótica de GRC. A MVN recomenda agendamento imediato de uma conferência executiva para validação técnica dos passivos detectados.
                </p>
              </div>
            </div>
          </div>

          <div class="p-10 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5">
            <div class="text-center md:text-left">
              <p class="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Próxima Etapa Técnica</p>
              <p class="text-white font-bold text-sm uppercase">Conferência com Consultor Especialista (15 min)</p>
            </div>
            <button class="bg-inst-red text-white text-[10px] font-bold uppercase tracking-[0.2em] px-10 py-5 rounded shadow-xl hover:bg-red-700 transition-all w-full md:w-auto">
              Confirmar Agendamento
            </button>
          </div>
        </div>
        
        <div class="mt-12 text-center pb-24">
            <button (click)="result.set(null)" class="text-gray-600 hover:text-white text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 mx-auto transition-all group">
                <mat-icon class="text-sm group-hover:-translate-x-1 transition-transform">arrow_back</mat-icon>
                Refazer Avaliação Técnica
            </button>
        </div>
      }
    </div>
  `
})
export class Diagnostic {
  private fb = inject(FormBuilder);
  private leadService = inject(LeadService);
  private aiService = inject(AiService);

  loading = signal(false);
  result = signal<string | null>(null);
  today = new Date();

  diagnosticForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: ['', Validators.required],
    operationType: ['Agroindústria'],
    environmentalIssues: ['Não'],
    lastAudit: ['mais_3_anos'],
    employees: [50]
  });

  async onSubmit() {
    if (this.diagnosticForm.valid) {
      this.loading.set(true);
      
      const formData = this.diagnosticForm.value;
      
      try {
        // AI Diagnostic Generation
        const report = await this.aiService.generateDiagnostic(formData);
        
        // Qualification
        const score = this.leadService.qualifyLead({
          size: 'Médio',
          employees: formData.employees,
          hasAudits: formData.lastAudit === 'mais_3_anos' || formData.lastAudit === 'nunca',
          environmentalIssues: formData.environmentalIssues === 'Sim' ? 'Pendências' : '',
          esgMaturity: 'Medium'
        });

        const newLead: Lead = {
          ...formData,
          id: Math.random().toString(36).substr(2, 9),
          score: score,
          diagnostic: report,
          timestamp: Date.now(),
          history: [],
          phone: '', // Added missing field from Lead interface
          size: 'Médio',
          esgMaturity: 'Medium'
        };

        await this.leadService.saveLead(newLead);
        
        this.result.set(report);
      } catch (err) {
        console.error(err);
        this.result.set('Houve um erro técnico na geração do relatório. Por favor, tente novamente ou entre em contato direto.');
      } finally {
        this.loading.set(false);
      }
    }
  }
}
