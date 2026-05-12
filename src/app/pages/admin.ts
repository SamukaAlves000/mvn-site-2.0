import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadService } from '../lead.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h1 class="text-3xl font-bold mb-2">Painel de <span class="text-soph-gold italic">Gestão de Leads</span></h1>
          <p class="text-gray-500 uppercase text-[10px] font-bold tracking-[0.2em]">Acesso restrito MVN Consultant</p>
        </div>
        
        <div class="flex gap-4">
          <div class="glass-panel px-6 py-3 rounded-lg flex items-center gap-3">
            <span class="text-2xl font-bold text-inst-blue">{{ leads().length }}</span>
            <span class="text-[10px] uppercase font-bold text-gray-500 leading-none">Total<br/>Interações</span>
          </div>
          <div class="glass-panel px-6 py-3 rounded-lg flex items-center gap-3">
            <span class="text-2xl font-bold text-soph-gold">{{ highPotentialLeads() }}</span>
            <span class="text-[10px] uppercase font-bold text-gray-500 leading-none">Alto<br/>Potencial</span>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl overflow-hidden border-white/5">
        <table class="w-full text-left text-sm">
          <thead class="bg-white/5 text-[10px] uppercase font-bold tracking-widest text-gray-400">
            <tr>
              <th class="px-6 py-4">Lead / Empresa</th>
              <th class="px-6 py-4">Data</th>
              <th class="px-6 py-4">Qualificação</th>
              <th class="px-6 py-4">Ação</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            @for (lead of leads(); track lead.id) {
              <tr class="hover:bg-white/[0.02] transition-colors">
                <td class="px-6 py-6">
                  <div class="font-bold text-white">{{ lead.name }}</div>
                  <div class="text-[10px] uppercase text-gray-500">{{ lead.company }} | {{ lead.email }}</div>
                </td>
                <td class="px-6 py-6 text-gray-500 font-mono text-xs">
                  {{ lead.timestamp | date:'short' }}
                </td>
                <td class="px-6 py-6">
                  <span [class]="'px-3 py-1 rounded-full text-[9px] font-bold uppercase ' + getScoreClass(lead.score)">
                    {{ lead.score }} Potencial
                  </span>
                </td>
                <td class="px-6 py-6 text-right">
                  <button (click)="viewLead(lead)" class="text-soph-gold hover:text-white transition-colors flex items-center gap-2 text-[10px] font-bold uppercase">
                    Ver Análise
                    <mat-icon class="text-sm">visibility</mat-icon>
                  </button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="4" class="px-6 py-24 text-center text-gray-600">
                  <mat-icon class="text-4xl mb-2 opacity-20">inbox</mat-icon>
                  <p class="uppercase text-xs font-bold tracking-widest">Nenhuma interação registrada até o momento</p>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (selectedLead()) {
        <div class="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div class="bg-premium-black-soft border border-soph-gold/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-[0_0_100px_rgba(212,175,55,0.1)]">
            <div class="p-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-premium-black-soft z-10">
              <div>
                <h3 class="text-xl font-bold">{{ selectedLead()?.name }}</h3>
                <p class="text-xs text-soph-gold uppercase font-bold">{{ selectedLead()?.company }}</p>
              </div>
              <div class="flex items-center gap-4">
                <button (click)="deleteLead(selectedLead()!.id)" class="text-xs font-bold text-inst-red uppercase hover:bg-inst-red/10 px-3 py-1 rounded transition-all">Excluir</button>
                <button (click)="selectedLead.set(null)" class="text-gray-500 hover:text-white">
                  <mat-icon>close</mat-icon>
                </button>
              </div>
            </div>
            
            <div class="p-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-gray-300">
                <div class="space-y-4">
                  <h4 class="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Informações Técnicas</h4>
                  <div class="bg-white/5 p-4 rounded-lg space-y-3 text-xs leading-relaxed">
                    <p><span class="text-gray-500 uppercase font-bold text-[9px] block">Email Corporativo</span> {{ selectedLead()?.email }}</p>
                    <p><span class="text-gray-500 uppercase font-bold text-[9px] block">Tipo de Operação</span> {{ selectedLead()?.operationType }}</p>
                    <p><span class="text-gray-500 uppercase font-bold text-[9px] block">Existência de Passivos</span> {{ selectedLead()?.environmentalIssues }}</p>
                  </div>
                </div>
                <div class="space-y-4">
                  <h4 class="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Qualificação IA</h4>
                  <div class="bg-white/5 p-4 rounded-lg flex flex-col justify-center h-full">
                    <p class="text-soph-gold font-bold text-3xl leading-none mb-2">{{ selectedLead()?.score }}</p>
                    <p class="text-[10px] text-gray-500 italic uppercase font-bold tracking-tight">Potencial de Conversão Técnica MVN</p>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <h4 class="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Relatório Diagnóstico Preliminar</h4>
                <div class="bg-white/5 p-8 rounded-lg text-sm text-gray-400 leading-relaxed font-serif whitespace-pre-wrap">
                  {{ selectedLead()?.diagnostic }}
                </div>
              </div>
            </div>

            <div class="p-8 bg-white/5 rounded-b-xl flex justify-between items-center">
                <p class="text-[9px] text-gray-600 uppercase font-bold">Confidencialidade MVN Consultant</p>
                <button class="bg-inst-red text-white text-[10px] font-bold uppercase tracking-widest px-8 py-4 rounded-lg shadow-lg hover:bg-red-700 transition-all">
                  Gerar PDF / Exportar Atendimento
                </button>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class Admin {
  private leadService = inject(LeadService);
  leads = this.leadService.leads;
  selectedLead = signal<Lead | null>(null);

  highPotentialLeads() {
    return this.leads().filter(l => l.score === 'Alto').length;
  }

  getScoreClass(score: string) {
    switch (score) {
      case 'Alto': return 'bg-green-500/10 text-green-500 border border-green-500/20';
      case 'Médio': return 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border border-gray-500/20';
    }
  }

  viewLead(lead: Lead) {
    this.selectedLead.set(lead);
  }

  async deleteLead(id: string) {
    await this.leadService.deleteLead(id);
    this.selectedLead.set(null);
  }
}
