import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup-dealer',
  templateUrl: './signup-dealer.component.html',
  styleUrls: ['./signup-dealer.component.css']
})
export class SignupDealerComponent implements OnInit {

  dcredentials:any={
    "email":"",
    "password":"",
    "name":"",
    "phoneNumber":"",
    "location":"",
    "image":""
   
  };

  formValue!: FormGroup;
  
  constructor(private service:LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  backToHome()
  {
    this.router.navigate(["/landing-page"])
  }

  onSingup()
  {
    this.service.registerDealer(this.dcredentials)
    .subscribe((data:any)=>
    {
      console.log(data);
      this.router.navigate(['login']);
      
    });
  }
}
