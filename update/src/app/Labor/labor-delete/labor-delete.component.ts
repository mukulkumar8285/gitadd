import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-labor-delete',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './labor-delete.component.html',
  styleUrls: ['./labor-delete.component.css']
})
export class LaborDeleteComponent {
  // const contractorId = this.contractorService.getContractorId();
  laborId: string | null;
  apiUrl = "http://localhost:3000/api/labor/delete";

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.laborId = this.route.snapshot.params['id'];
  }

  deleteLabor() {
    if (!this.laborId) {
      alert("Please enter labor id");
      return;
    }

  
    const url = `${this.apiUrl}/${this.laborId}`;

    this.http.delete(url)
      .subscribe(
        (response: any) => {
          console.log('Labor Deleted', response);
          alert("Labor Deleted Successfully");
        },
        (error: any) => {
          console.log('Error', error);
          if (error.status === 400) {
            alert("Labor Id is not valid");
          } else if (error.status === 404) {
            alert("Labor Not Found");
          } else {
            alert("Error Occurred");
          }
        }
      );
  }
}