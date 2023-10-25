import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dealer, UpdateDealer } from '../dealer-dashboard/dealer.model';
import { DealerServiceService } from '../services/dealer-service.service';

@Component({
  selector: 'app-dealer-details',
  templateUrl: './dealer-details.component.html',
  styleUrls: ['./dealer-details.component.css']
})
export class DealerDetailsComponent implements OnInit {

  constructor(private dealerService: DealerServiceService,  private formBuilder: FormBuilder,private route:ActivatedRoute) { }

  public dealerid: any;
  formValue!: FormGroup;
  dealerDetails:any;
  dummyprofileimage:any;
  dealerUpdateObject: UpdateDealer = new UpdateDealer();

  ngOnInit(): void {
    this.formValue = this.formBuilder.group(
      {
        dealerid:[''],
        dealeremail:[''],
        dealerpass:[''],
        dealername:[''],
        dealerphone:[''],
        dealerlocation:[''],
        dealerabout:[''],
        dealerimage:[''],
        dealerbank:[''],
        dealerbranch:[''],
        dealeraccountno:[''],
        dealerpaytmid:['']
       }
     )
     let id = String(this.route.snapshot.paramMap.get('dealerid') || '');
    this.dealerid = id;
    this.getDealerDetails();
  }

  getDealerDetails()
  {
    this.dealerService.getDealerDetails(this.dealerid).subscribe((res:any)=>
    {
      console.log(res);
      this.dealerDetails = res;
    })
  }

  //edit
  editRes()
  {
    this.dummyprofileimage = this.dealerDetails.image;
    this.formValue.controls['dealerid'].setValue(this.dealerDetails.id);
    this.formValue.controls['dealername'].setValue(this.dealerDetails.name);
    this.formValue.controls['dealeremail'].setValue(this.dealerDetails.email);
    this.formValue.controls['dealerabout'].setValue(this.dealerDetails.about);
    this.formValue.controls['dealerphone'].setValue(this.dealerDetails.phoneNumber);
    this.formValue.controls['dealerlocation'].setValue(this.dealerDetails.location);
    this.formValue.controls['dealerimage'].setValue(this.dealerDetails.image);
    this.formValue.controls['dealerbank'].setValue(this.dealerDetails.bank);
    this.formValue.controls['dealerbranch'].setValue(this.dealerDetails.branch);
    this.formValue.controls['dealeraccountno'].setValue(this.dealerDetails.accountno);
    this.formValue.controls['dealerpaytmid'].setValue(this.dealerDetails.paytmid);
  }

  updateDealerDetails()
  {
    this.dealerUpdateObject.id = this.formValue.value.dealerid;
    this.dealerUpdateObject.name = this.formValue.value.dealername;
    this.dealerUpdateObject.email = this.formValue.value.dealeremail;
    this.dealerUpdateObject.about = this.formValue.value.dealerabout;
    this.dealerUpdateObject.phoneNumber = this.formValue.value.dealerphone;
    this.dealerUpdateObject.pass = this.dealerDetails.dealerpass;
    this.dealerUpdateObject.location = this.formValue.value.dealerlocation;
    this.dealerUpdateObject.image = this.formValue.value.dealerimage;
    this.dealerUpdateObject.bank = this.formValue.value.dealerbank;
    this.dealerUpdateObject.branch = this.formValue.value.dealerbranch;
    this.dealerUpdateObject.accountno = this.formValue.value.dealeraccountno;
    this.dealerUpdateObject.paytmid = this.formValue.value.dealerpaytmid;


    this.dealerService.updateDealerDetails(this.dealerUpdateObject, this.dealerUpdateObject.id)
    .subscribe((res:any)=>
    {
      console.log(res);
      alert("Profile Updated");
      this.getDealerDetails();
      
    },
    err=>
    
    {
      alert("Profile Updated");
      this.getDealerDetails();
      
    })
  }

  //delete
  deleteDealerDetails()
  {
    this.dealerService.deleteDealerDetails(this.dealerid).subscribe((res:any)=>
    {
      alert("Dealer Deleted")
      this.getDealerDetails();
    },err=>
    {
      alert("Dealer Deleted");
      this.getDealerDetails();
    })
  }
}
