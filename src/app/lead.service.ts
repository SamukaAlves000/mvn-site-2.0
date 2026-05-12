import { Injectable, signal, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private firestore = inject(Firestore);
  private leadsCollection = collection(this.firestore, 'leads');

  private leads$ = collectionData(
    query(this.leadsCollection, orderBy('timestamp', 'desc')),
    { idField: 'id' }
  ) as Observable<Lead[]>;

  leads = toSignal(this.leads$, { initialValue: [] });

  async saveLead(lead: Lead) {
    const leadDoc = doc(this.leadsCollection, lead.id);
    await setDoc(leadDoc, lead);
  }

  async deleteLead(id: string) {
    const leadDoc = doc(this.leadsCollection, id);
    await deleteDoc(leadDoc);
  }

  qualifyLead(lead: Partial<Lead>): 'Alto' | 'Médio' | 'Baixo' {
    let score = 0;
    
    // Size potential
    if (lead.size === 'Grande' || (lead.employees && lead.employees > 100)) score += 5;
    else if (lead.size === 'Médio' || (lead.employees && lead.employees > 20)) score += 3;
    
    // Criticality
    if (lead.environmentalIssues && lead.environmentalIssues.length > 5) score += 4;
    if (lead.hasAudits) score += 3;
    
    // ESG Maturity (Low maturity = Higher potential for consultancy)
    if (lead.esgMaturity === 'Low') score += 5;
    else if (lead.esgMaturity === 'Medium') score += 2;

    if (score >= 10) return 'Alto';
    if (score >= 5) return 'Médio';
    return 'Baixo';
  }
}
