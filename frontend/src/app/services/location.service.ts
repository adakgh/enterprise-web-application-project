import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddressInfo} from '../models/AddressInfo';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    position = '';

    constructor(private httpClient: HttpClient) {
    }

    getAddressInfo(searchString: string): any {

        const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${searchString}&format=json&limit=1`;

        return this.httpClient.get(url).pipe(
            map(
                (rawAddresses: any[]) => {

                    // creating an empty list of countries
                    let addressInfo = null;

                    if (rawAddresses.length > 0) {
                        addressInfo = new AddressInfo();
                        addressInfo.displayName = rawAddresses[0].display_name;
                        addressInfo.lat = parseFloat(rawAddresses[0].lat);
                        addressInfo.lon = parseFloat(rawAddresses[0].lon);
                        addressInfo.houseNumber = rawAddresses[0].address.house_number;
                        addressInfo.streetName = rawAddresses[0].address.road;
                        addressInfo.city = rawAddresses[0].address.city;
                        addressInfo.country = rawAddresses[0].address.country;
                        addressInfo.postCode = rawAddresses[0].address.postcode;
                    }

                    return addressInfo;
                }
            ));
    }

}
