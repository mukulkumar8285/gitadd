import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  private contractorId: string | null = null;

  setContractorId(id: string) {
    this.contractorId = id;
  }

  getContractorId(): string | null {
    return this.contractorId;
  }
}