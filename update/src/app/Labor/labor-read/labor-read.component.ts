import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContractorService } from '../../contractor.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-labor-read',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './labor-read.component.html',
  styleUrls: ['./labor-read.component.css']
})
export class LaborReadComponent {
  labors: any[] = [];
  filteredLabors: any[] = [];
  errorMessage: string = '';
  apiUrl = 'http://localhost:3000/api/labor';

  constructor(private http: HttpClient, private router: Router, private contractorService: ContractorService) { }

  ngOnInit(): void {
    this.loadLabor();
  }

  loadLabor(): void {
    this.http.get<any>(`${this.apiUrl}/read`)
      .subscribe(
        data => {
          this.labors = data.Readlabore;
          this.filterLaborByContractor(); 
        },
        error => {
          console.log("Error Fetching Labor:", error);
          this.errorMessage = "Error fetching labor data.";
        }
      );
  }

  filterLaborByContractor(): void {
    const contractorId = this.contractorService.getContractorId(); 

    if (contractorId) {
 
      this.filteredLabors = this.labors.filter(labor => {
        return labor.contractor && Array.isArray(labor.contractor) &&
          labor.contractor.some((cont: { _id: string }) => cont._id === contractorId);
      });
    } else {
      this.filteredLabors = []; 
    }
  }

  deleteLabor(laborId: string): void {
    if (!laborId) {
      alert("Labor ID is required");
      return;
    }

    const url = `${this.apiUrl}/delete/${laborId}`;

    this.http.delete(url)
      .subscribe(
        (response: any) => {
          console.log('Labor Deleted', response);
          alert("Labor Deleted Successfully");

          this.loadLabor();
        },
        (error: any) => {
          console.log('Error Deleting Labor:', error);
          if (error.status === 400) {
            alert("Labor ID is not valid");
          } else if (error.status === 404) {
            alert("Labor Not Found");
          } else {
            alert("An error occurred while deleting the labor");
          }
        }
      );
  }
  navigateToUpdate(laborId: string): void {
    this.router.navigate([`/labor/update`, laborId]);
  }
}
