import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Crops } from '../farmer-dashboard/farmer-dashboard';
import { Farmer } from '../farmer-details/farmer-detail.model';
import { DealerServiceService } from '../services/dealer-service.service';
import { FarmerServiceService } from '../services/farmer-service.service';
import { LoginService } from '../services/login.service';
import { Dealer, transactionSave } from './dealer.model';

declare var Razorpay: any;
@Component({
  selector: 'app-dealer-dashboard',
  templateUrl: './dealer-dashboard.component.html',
  styleUrls: ['./dealer-dashboard.component.css']
})
export class DealerDashboardComponent implements OnInit {
  public loggedIn=false;
  liveCrops:Crops[];
  liveCropsViewObject:Crops = new Crops();
  searchText:any;
  oneFarmer:Farmer;
  dealeremail:any;
  formValue!:FormGroup;
  dealerDetails:any;
  buyObject:Crops;
  dealerObject: Dealer = new Dealer();
  dealerId: any;
  singleCropData:any;
  //dealerId: string = "62376af69be2d36022834c6f";

  constructor(private formBuilder: FormBuilder,private farmerService: FarmerServiceService,private route: ActivatedRoute,private router: Router,private loginService: LoginService, private dealerService: DealerServiceService){}

  ngOnInit(): void {
    this.loggedIn=this.loginService.isLoggedIn();
    let did = String(this.route.snapshot.paramMap.get('token') || '');
    this.dealerId = did;
    this.formValue = this.formBuilder.group(
      {
        fid:[''],
        cropid:[],
        cropname:[''],
        cropimage: [''],
        cropqlty:[''],
        croplocation: [''],
        cropcontact:[''],
        cropqnty: [''],
        cropprice: [''],
        cropdesc: ['']
      }
    )
    this.getDealerDetails();
    this.getLiveCrops();
    this.getOneFarmerDetails();
    
  }
  logoutUser()
  {
    this.loginService.logout()
    location.reload()
  }

  onSelect()
  {
    this.router.navigate(['/dealer-dashboard',this.dealerId,this.dealerId]);
  }

 //fetch crops
 getLiveCrops()
 {
 this.dealerService.getLiveCrops().subscribe((data:any[])=> {
   console.log(data);
   this.liveCrops= data;
   //this.liveCrops = Array.of(this.liveCrops); 
 })
}

onBuyRes(data:any)
{
  this.formValue.controls['fid'].setValue(data.fid);
  this.formValue.controls['cropid'].setValue(data.cropid);
  this.formValue.controls['cropprice'].setValue(data.cropprice);
  this.formValue.controls['cropqnty'].setValue(data.cropqnty);
  this.singleCropData=data;
}

//get the farmerDetails of the selected crop
oneRes(data:any)
{
  this.oneFarmer.fid = data.fid;
  this.getOneFarmerDetails();
}

getOneFarmerDetails()
{
  
  this.farmerService.getFarmerDetails(this.liveCropsViewObject.fid).subscribe((data:any)=>
  {
    console.log(data);
    this.oneFarmer=data;
    
  })
}

getDealerDetails()
{
  this.dealerService.getDealerDetails(this.dealerId).subscribe((resp:any)=>
  {
    console.log(resp);
    this.dealerDetails = resp;
    //this.dealerDetails = Array.of(this.dealerDetails);

  })
}

onliveCropsViewRes(res:any)
{
  this.liveCropsViewObject.fid = res.fid;
  this.liveCropsViewObject.cropid = res.cropid;
  this.liveCropsViewObject.cropname = res.cropname;
  this.liveCropsViewObject.cropcontact = res.cropcontact;
  this.liveCropsViewObject.cropdesc = res.cropdesc;
  this.liveCropsViewObject.croplocation = res.croplocation;
  this.liveCropsViewObject.cropprice = res.cropprice;
  this.liveCropsViewObject.cropqlty = res.cropqlty;
  this.liveCropsViewObject.cropqnty = res.cropqnty;
  this.liveCropsViewObject.cropimage = res.cropimage;
}

transactionSave: transactionSave = new transactionSave();

transactionDisplay()
{
  let amount=this.singleCropData.cropprice
  this.transactionSave.cropid=this.singleCropData.cropid
  this.transactionSave.dealerid=this.dealerId;
  this.transactionSave.fid=this.singleCropData.fid;
  this.transactionSave.amount=amount
  this.dealerService.createTxn(amount).subscribe(
    (response)=>
    {
      console.log(response);
      this.openTransactionModel(response,this.transactionSave);
    }  
  );
  
}

openTransactionModel(response: any,transactionSave:any){
  var options = {
    order_id: response.order_id,
    key: response.key,
    amount: response.amount,
    currency: response.currency,
    name: 'Tarun Sharma',
    description: 'Payment',
    image: '',
    handler: (response: any) => {
      this.processResponse(response,transactionSave);

    },
    prefill: {
      name: 'Tarun Sharma',
      email: 'av17@gmail.com',
      contact: '61726781'
    },
    notes:{
      address: 'GHHASKN'
    },
    theme: {
      color: '#F37254'
    }
  };

  var razorPayObject = new Razorpay(options);
  razorPayObject.open();
}

processResponse(resp: any,transactionSave:any){
  transactionSave.transactionid=resp.razorpay_payment_id;

  this.dealerService.saveTxn(transactionSave).subscribe(
    (response)=>
    {
      console.log("HurrayDataSaved")
      location.reload();
    }
  );

  console.log(transactionSave);
  
}


}