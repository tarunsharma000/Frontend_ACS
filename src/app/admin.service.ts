import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }


  getPaymentDtls()
  {
     return this.http.get<any[]>("http://localhost:8080/getPymtDtls");
  }

}
