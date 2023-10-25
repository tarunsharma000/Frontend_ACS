import { Crops } from "../farmer-dashboard/farmer-dashboard";

export class Farmer {

    fid: string = '';
    femail: string = '';
    fpass: string = '';
    fname: string = '';
    fcontact: string = '';
    fbank:string = '';
    fimage:string = '';
    faccountno: string = '';
    fpaytmid:string = '';
    fbankbranch:string = '';
    flocation: string = '';
    fabout: string = '';
    crops: Array<Crops> = [];
}

export class UpdatedFarmer {

    id: string = '';
    email: string = '';
    pass: string = '';
    name: string = '';
    phoneNumber: string = '';
    bank:string = '';
    image:string = '';
    accountno: string = '';
    paytmid:string = '';
    branch:string = '';
    location: string = '';
    about: string = '';
    // crops: Array<Crops> = [];
}