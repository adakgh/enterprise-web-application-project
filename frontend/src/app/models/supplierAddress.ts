export class SupplierAddress {
    public city: string;
    public country = 'Nederland';
    public number: string;
    public postalCode: string;
    public street: string;

    constructor() {
        this.city = 'Heemskerk';
        this.number = '22';
        this.postalCode = '1969 MS';
        this.street = 'Cieweg';
    }
}
