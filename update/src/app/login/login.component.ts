import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContractorService } from '../contractor.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  LoginData: any = { email: "", password: "" };
  
  LoginApi = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient, private router: Router, private contractorService: ContractorService) { }

 LoginUser() {
  this.http.post(this.LoginApi, this.LoginData).subscribe((response: any) => {
    console.log(response); 

    
    if (response.message === 'Login Successfull') {
      
      const contractorId = response.user._id; 
      this.contractorService.setContractorId(contractorId);
      console.log("Contractor ID:", contractorId);
      this.router.navigate(["/labor/create"]); 
    } else {
      console.error('Login failed:', response.message); 
    }
  }, (error) => {
    console.error('Error occurred during login:', error); 
  });
}

}