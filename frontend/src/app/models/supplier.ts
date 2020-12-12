import {Form} from '@angular/forms';

export class Supplier {
    public companyName: string;
    public contactPerson: string;
    public contactEmail: string;
    public phoneNumber: string;
    public website: string;
    public shortDescription: string;
    public description: string;
    public addresses: any[] = [{
        street: '',
        number: 0,
        postalCode: '',
        city: '',
    }];

    constructor() {
    }
}
