import { Component, OnInit, Input} from '@angular/core';
import { FarmerServiceService } from '../services/farmer-service.service';
import { ActivatedRoute } from '@angular/router';
import { Farmer, UpdatedFarmer } from './farmer-detail.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Crops } from '../farmer-dashboard/farmer-dashboard';


@Component({
  selector: 'app-farmer-details',
  templateUrl: './farmer-details.component.html',
  styleUrls: ['./farmer-details.component.css']
})
export class FarmerDetailsComponent implements OnInit {

  public fid: any;
  storeFarmerDetails:any;
  dummyprofileimage:any;
  formValue!: FormGroup
  updatedFarmerDetails: UpdatedFarmer = new UpdatedFarmer();
  updatedBankDetails: Farmer;

  constructor(private route: ActivatedRoute, private farmerService:FarmerServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group(
          {
            fid:[''],
            femail:[''],
             fpass:[''],
             fname: [''],
             fcontact:[''],
             fbank:[''],
             fimage:[''],
             faccountno:[''],
             fpaytmid:[''],
             fbankbranch:[''],
             flocation:[''],
             fabout: [''],
             crops:[Crops]
           }
         )
    let id = String(this.route.snapshot.paramMap.get('fid') || '');
    this.fid = id;
    this.getFarmerDetails();
    //this.formfunction
    console.log(this.storeFarmerDetails);
  }




  //form Builder
  // formfunction()
  // {
  //   this.formValue1 = this.formBuilder.group(
  //     {
  //       fid:[''],
  //       femail:[''],
  //       fpass:[''],
  //       fname: [''],
  //       fcontact:[''],
  //       fbank:[''],
  //       fimage:[''],
  //       faccountno:[''],
  //       fpaytmid:[''],
  //       fbankbranch:[''],
  //       flocation:[''],
  //       fabout: ['']
  //     }
  //   )
  // }

  getFarmerDetails()
  {
    this.farmerService.getFarmerDetails(this.fid).subscribe((res:any[])=>
    {
      console.log(res);
      this.storeFarmerDetails = res;
    })
  }

  updateRes()
  { 
    this.dummyprofileimage = this.storeFarmerDetails.image
    this.formValue.controls['fid'].setValue(this.storeFarmerDetails.id);
    this.formValue.controls['fname'].setValue(this.storeFarmerDetails.name);
    this.formValue.controls['femail'].setValue(this.storeFarmerDetails.email);
    this.formValue.controls['fabout'].setValue(this.storeFarmerDetails.about);
    this.formValue.controls['fcontact'].setValue(this.storeFarmerDetails.phoneNumber);
    this.formValue.controls['flocation'].setValue(this.storeFarmerDetails.location);
    this.formValue.controls['fimage'].setValue(this.storeFarmerDetails.image);
    this.formValue.controls['fbank'].setValue(this.storeFarmerDetails.bank);
    this.formValue.controls['fbankbranch'].setValue(this.storeFarmerDetails.branch);
    this.formValue.controls['faccountno'].setValue(this.storeFarmerDetails.accountno);
    this.formValue.controls['fpaytmid'].setValue(this.storeFarmerDetails.paytmid);
    
  }

  updateFarmerDetails()
  {
    this.updatedFarmerDetails.id = this.formValue.value.fid;
    this.updatedFarmerDetails.name = this.formValue.value.fname;
    this.updatedFarmerDetails.email = this.formValue.value.femail;
    this.updatedFarmerDetails.about = this.formValue.value.fabout;
    this.updatedFarmerDetails.pass = this.storeFarmerDetails.fpass;
    //this.updatedFarmerDetails.crops = this.storeFarmerDetails.crops;
    this.updatedFarmerDetails.phoneNumber = this.formValue.value.fcontact;
    this.updatedFarmerDetails.location = this.formValue.value.flocation;
    this.updatedFarmerDetails.image = this.formValue.value.fimage;
    this.updatedFarmerDetails.bank = this.formValue.value.fbank;
    this.updatedFarmerDetails.branch = this.formValue.value.fbankbranch;
    this.updatedFarmerDetails.accountno = this.formValue.value.faccountno;
    this.updatedFarmerDetails.paytmid = this.formValue.value.fpaytmid;

    this.farmerService.updateFarmerDetails(this.updatedFarmerDetails.id, this.updatedFarmerDetails)
    .subscribe((res:any)=>
    {
      console.log(res);
      alert("Profile Updated");
      this.getFarmerDetails();
      
    },
    err=>
    {
      alert("Profile Updated");
      this.getFarmerDetails();
      
    })
  }

  //delete farmer
  deleteFarmer()
  {
    this.farmerService.deleteFarmer(this.storeFarmerDetails.fid).subscribe((res:any)=>
    {
      console.log(res);
      alert("Farmer Deleted");
      this.getFarmerDetails();
    })
  }
}
