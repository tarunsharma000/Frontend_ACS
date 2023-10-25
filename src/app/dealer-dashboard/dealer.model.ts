export class Dealer
{
    dealerid:string = '';
    dealeremail: string = '';
    dealerpass: string = '';
    dealername:string = '';
    dealerphone: string= '';
    dealerlocation: string = '';
    dealerabout: string = '';
    dealerimage: string = '';
    dealerbank: string ='';
    dealerbranch: string ='';
    dealeraccountno: string = '';
    dealerpaytmid: string = '';
}
export class UpdateDealer
{
    id:string = '';
    email: string = '';
    pass: string
    name:string = '';
    phoneNumber: string= '';
    location: string = '';
    about: string = '';
    image: string = '';
    bank: string ='';
    branch: string ='';
    accountno: string = '';
    paytmid: string = '';
}
export class transactionSave
{
    cropid:string='';
    fid:string='';
    dealerid:string='';
    amount:any=0;
    transactionid:string=''
}