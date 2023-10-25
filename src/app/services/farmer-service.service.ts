import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { Crops } from '../farmer-dashboard/farmer-dashboard';
import { Farmer, UpdatedFarmer } from '../farmer-details/farmer-detail.model';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class FarmerServiceService {

  constructor(private http:HttpClient,private loginService: LoginService) { }

  /*public getDetails()
  {
    return this.http.get("http://localhost:8001/62109c6e54d8ceb199635f32",{responseType:'text' as'json'});
  }*/

  getDetails(fid:string):Observable<any[]>
  {
    return this.http.get<any[]>("http://localhost:9092/crop/getCrop/"+fid);
  }


  addCrops(crops:Crops, fid:string): Observable<Crops[]>
  {
    return this.http.post<Crops[]>("http://localhost:9092/crop/addCrop/"+fid,crops);
  }

  //update
  updateCrops(crops:Crops, fid:string, cropid:String): Observable<Crops[]>
  {
    return this.http.put<Crops[]>("http://localhost:9092/crop/updateCrop/"+fid+"/"+cropid, crops);
    
  }
  //delete
  deleteAd(fid:string,cropid:number) : Observable<Crops[]>
  {
    return this.http.delete<Crops[]>("http://localhost:9092/crop/deleteCrop/"+fid+"/"+cropid);
  }

  //getfarmerDetails
  getFarmerDetails(fid:string): Observable<any[]>
  {
    return this.http.get<any[]>("http://localhost:9092/authService/getById/"+fid);
  }

  //get farmer details by email
  getFarmerDetailsByEmail(femail:string):Observable<Farmer[]>
  {
    return this.http.get<Farmer[]>("http://localhost:8001/farmer/"+femail);
  }

  //update farmer details
  updateFarmerDetails(fid:string, farmer:UpdatedFarmer): Observable<any[]>
  {
    return this.http.put<any[]>("http://localhost:9098/authService/updateById/"+fid,farmer);
  }

  //delete farmer
  deleteFarmer(fid:string): Observable<Farmer[]>
  {
    return this.http.delete<Farmer[]>("http://localhost:8001/delete/"+fid);
  }
}
