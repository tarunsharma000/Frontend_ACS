import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dealer, UpdateDealer } from '../dealer-dashboard/dealer.model';
import { Crops } from '../farmer-dashboard/farmer-dashboard';

@Injectable({
  providedIn: 'root'
})
export class DealerServiceService {


  saveTxn(transactionSave: any) {
    return this.http.post<any[]>("http://localhost:8080/saveTxn",transactionSave);
  }

  createTxn(amount: number) {
    return this.http.get<any[]>("http://localhost:8080/createTransaction/"+amount)
  }

  constructor(private http:HttpClient) { }

  //get crops
  getLiveCrops():Observable<Crops[]>
  {
    return this.http.get<Crops[]>("http://localhost:9099/crop/getAllCrops");
  }

  getDealerDetails(dealerid:string):Observable<any[]>
  {
    return this.http.get<any[]>("http://localhost:9098/authService/getById/"+dealerid);
  }

  //update
  updateDealerDetails(dealer:UpdateDealer, dealerid:string):Observable<any[]>
  {
    return this.http.put<any[]>("http://localhost:9098/authService/updateById/"+dealerid,dealer);
  }

  //delete
  deleteDealerDetails(dealerid:string):Observable<Dealer[]>
  {
    return this.http.delete<Dealer[]>("http://localhost:8002/delete/"+dealerid);
  }
}
