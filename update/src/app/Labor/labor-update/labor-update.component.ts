import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-labor-update',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './labor-update.component.html',
  styleUrls: ['./labor-update.component.css']
})
export class LaborUpdateComponent {
  LaborId: string;
  updateData: any = { name: "", email: "", phone: "", role: "" };
  apiUrl = "http://localhost:3000/api/labor";

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.LaborId = this.route.snapshot.params['id'];
    this.loadLaborDetails();
  }

  loadLaborDetails(): void {
    if (this.LaborId) {
      const url = `${this.apiUrl}/read/${this.LaborId}`;
      this.http.get<any>(url).subscribe(
        data => {
          this.updateData = { 
            name: data.name, 
            email: data.email, 
            phone: data.phone, 
            role: data.role 
          };
        },
        error => {
          console.error('Error loading labor details', error);
        }
      );
    }
  }

  updateLabor(): void {
    if (!this.LaborId) {
      alert("No Labor ID Provided!");
      return;
    }

    const url = `${this.apiUrl}/update/${this.LaborId}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.put(url, this.updateData, { headers }).subscribe(
      (response: any) => {
        console.log("Labor Updated Successfully", response);
        alert("Labor Updated Successfully");
      },
      (error: any) => {
        console.log("Error Updating Labor", error);
        alert("Error Updating Labor");
      }
    );
  }
}
