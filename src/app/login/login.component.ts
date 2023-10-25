import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email:any
  resStore:string
  credentials={
    phoneNumber:'',
    password:''
  }
    constructor(private loginService: LoginService, private router:Router)
    {}

    ngOnInit(): void {
      
    } 

    backToHome()
  {
    this.router.navigate(["/landing-page"])
  }

    onSubmit(){
      console.log("Form is Submitted");
      console.log(this.credentials.phoneNumber);
      console.log(this.credentials.password);
      if((this.credentials.phoneNumber!='' && this.credentials.password!='') && (this.credentials.phoneNumber!=null && this.credentials.password!=null))
      {
        console.log("Save the form to server")
        this.loginService.generateTokenDealer(this.credentials).subscribe(
          (response: any) => {
            console.log(response); 
            this.resStore = response;
            
            this.loginService.loginUser(response.jwtToken)
            //window.location.href="/dealer-dashboard" 
            if(response.student.role=="dealer")
            {
              this.router.navigate(['/dealer-dashboard',response.student.id])
            }
            
          },

          error=>{
            console.log(error);
          }
        )
      }
      else{
        console.log("Fields are empty");
      }
    }
    
  }