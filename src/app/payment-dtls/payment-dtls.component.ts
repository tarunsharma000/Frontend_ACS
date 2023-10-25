import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FarmerServiceService } from '../services/farmer-service.service';

@Component({
  selector: 'app-payment-dtls',
  templateUrl: './payment-dtls.component.html',
  styleUrls: ['./payment-dtls.component.css']
})
export class PaymentDtlsComponent implements OnInit {

  constructor(private adminService: AdminService,private farmerService:FarmerServiceService) { }

  ngOnInit(): void {
    this.getPaymentDtls()
  }


   farmer: any[] = [];
  dealer:any[]=[];
  paymentDtls:any[];
  getPaymentDtls()
  {
     this.adminService.getPaymentDtls().subscribe(
      (response)=>
      {
        
        this.paymentDtls=response;
        console.log(this.paymentDtls);
        for(let i of this.paymentDtls)
        {
          console.log("HHHHHHHHHHHHHHHHHHHHHHH")
          this.getFarmerDetails(i.fid);
        }
        for(let k of this.paymentDtls)
        {
          console.log("dddddddddddd")
          this.getDealerDtls(k.dealerid);
        }
      
      }
     )
  }

 

getFarmerDetails(fid:string)
{
  this.farmerService.getFarmerDetails(fid).subscribe((res:any)=>
  {
    console.log("#########################"+res.name);
    this.farmer.push(res.name);
  })
}

  getDealerDtls(dealerid:string)
  {
    this.farmerService.getFarmerDetails(dealerid).subscribe((res:any)=>
      {
       console.log("#########################"+res.name);
       this.dealer.push(res.name);
      }
    )
  }

}
