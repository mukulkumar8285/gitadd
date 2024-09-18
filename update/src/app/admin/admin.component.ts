import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContractorService } from '../contractor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule , FormsModule , HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  LoginData: any = { email: "", password: ""  };
  
  LoginApi = 'http://localhost:3000/api/login/admin';

  constructor(private http: HttpClient, private router: Router, private contractorService: ContractorService) { }

 LoginUser() {
  this.http.post(this.LoginApi, this.LoginData).subscribe((response: any) => {
    console.log(response); 

    
    if (response.message === 'Login Successfull') {
      this.router.navigate(["/contractors/create"]); 
    } else {
      console.error('Login failed:', response.message); 
    }
  }, (error) => {
    console.error('Error occurred during login:', error); 
  });
}

contratorPage(){
  this.router.navigate(["/login"])
}

}
