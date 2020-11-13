import {SupplierAddress} from "./supplierAddress";

export class Supplier {
    public companyName: string;
    public contactPerson: string;
    public contactEmail: string;
    public phoneNumber: string;
    public website: string;
    public shortDescription: string;
    public description: string;
    public adres: SupplierAddress;

    constructor() {
        /*this.companyName = 'De Duintuin - Heemskerk';
        this.contactPerson = '06 57322990';
        this.contactEmail = 'info@duintuin.eu';
        this.phoneNumber = 'www.duintuin.eu';
        this.adres = new SupplierAddress();
        this.shortDescription = 'Shorttt Description';
        this.description = 'In 2014 is De Duintuin gestart op initiatief van André Nelis. Samen met zijn partner Svetlana waren zij\n' +
            'verantwoordelijk voor de ontwikkeling van De Duintuin. Al snel werd het project groter als gedacht en werd\n' +
            'er ondersteuning gevonden bij de werkKRACHTcentrale voor het uitwerken van de ideeën. Mede dankzij de\n' +
            'werkKRACHTcentrale zijn er vrijwilligers actief op De Duintuin. Zonder al deze steun zou De Duintuin niet\n' +
            'bestaan in zijn huidige vorm: een sociale onderneming op zoek naar verbindingen in de maatschappij.\n' +
            '\n' +
            'De Duintuin is een tuin in het Heemskerkse duingebied waar onbespoten groenten, kruiden en klein fruit voor\n' +
            'de regionale verkoop worden gekweekt met inzet van mensen die willen doorgroeien naar een volwaardige(r)\n' +
            'deelname aan de maatschappij.';*/
    }
}
