import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-update-contractor',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  
  templateUrl: './update-contractor.component.html',
  styleUrls: ['./update-contractor.component.css']
})
export class UpdateContractorComponent {
  contractorId: string;
  updateData: any = { email: '', name: '' }; 
  apiUrl = 'http://localhost:3000/api/contractor'; 

  constructor(private http: HttpClient, private route: ActivatedRoute) {

    this.contractorId = this.route.snapshot.params['id'];
  }

  updateContractor() {
    if (!this.contractorId) {
      alert('No Contractor ID provided!');
      return;
    }

    const url = `${this.apiUrl}/update/${this.contractorId}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    this.http.put(url, this.updateData, { headers })
      .subscribe(
        (response: any) => {
          console.log('Contractor updated:', response);
          alert('Contractor updated successfully');
        },
        (error) => {
          console.error('Error updating contractor:', error);
          if (error.status === 400) {
            alert(error.error.message);
          } else {
            alert('Failed to update contractor');
          }
        }
      );
  }

 
}
