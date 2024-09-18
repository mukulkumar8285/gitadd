import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContractorService } from '../../contractor.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-labor',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './create-labor.component.html',
  styleUrls: ['./create-labor.component.css'],
  animations: [
    trigger('formSubmitAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('buttonAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.9)' }),
        animate('200ms ease-out', style({ transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class CreateLaborComponent {
  LaborData = { name: "", email: "", phone: "", password: "", role: "" }; 
  apiUrl = "http://localhost:3000/api/labor/create";
  successMessage: string | null = null;

  constructor(private http: HttpClient,private router : Router ,  private contractorService: ContractorService) {}

  createLabor() {
    if (!this.LaborData.name || !this.LaborData.email || !this.LaborData.phone || !this.LaborData.password || !this.LaborData.role) {
      this.successMessage = "Please fill all fields"; 
      return;
    }

    const contractorId = this.contractorService.getContractorId(); 
    
    if (!contractorId) {
      this.successMessage = "Contractor ID is not set";
      return;
    }

    const laborDatas = {
      ...this.LaborData,
      contractor: contractorId 
    };

    const headers = new HttpHeaders().set("Content-Type", "application/json");

    this.http.post(`${this.apiUrl}`, laborDatas, { headers })
      .subscribe(
        (response: any) => {
          this.successMessage = 'Labor Created Successfully'; 
          console.log("Labor Created", response);
          alert("Labor Created Successfully");
          this.LaborData = { name: "", email: "", phone: "", password: "", role: "" };

          setTimeout(() => {
            this.successMessage = null; 
          }, 3000);
        },
        (error) => {
          console.log("Error", error);
          if (error.status === 400) {
            this.successMessage = "Labor Already Exists"; 
          } else {
            this.successMessage = "Error Occurred"; 
          }
        }
      );
  }

  viewLabor(){
    this.router.navigate(["/labor/read"])

  }

  deleteUser(){
    const contractorId = this.contractorService.getContractorId();
    this.router.navigate([`/labor/delete/${contractorId}`])
  }
}