import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-contractor',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './read-contractor.component.html',
  styleUrls: ['./read-contractor.component.css']
})
export class ReadContractorComponent {
  contractors: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadContractors();
  }

  loadContractors(): void {
    this.http.get<any>('http://localhost:3000/api/contractor/read')
      .subscribe(
        data => {
          this.contractors = data.contractor;
        },
        error => {
          console.error('Error fetching contractors:', error);
        }
      );
  }

  deleteContractor(contractorId: string): void {
    if (!contractorId) {
      alert('No Contractor ID provided!');
      return;
    }

    const url = `http://localhost:3000/api/contractor/delete/${contractorId}`;

    this.http.delete(url)
      .subscribe(
        (response: any) => {
          console.log('Contractor deleted:', response);
          alert('Contractor deleted successfully');
          this.loadContractors(); 
        },
        (error) => {
          console.error('Error deleting contractor:', error);
          if (error.status === 400) {
            alert(error.error.message);
          } else if (error.status === 404) {
            alert('Contractor not found');
          } else {
            alert('Failed to delete contractor');
          }
        }
      );
  }

  navigateToUpdate(contractorId: string): void {
    this.router.navigate([`/contractors/update/${contractorId}`]);
  }
}
