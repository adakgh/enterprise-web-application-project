import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private httpClient: HttpClient) {}

    getAddressInfo(searchString: string): any {

        const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${searchString}&format=json&limit=1`;

        return this.httpClient.get(url).pipe(
            map(
                (rawAddresses: any[]) => {
                    let addressInfo = null;

                    if (rawAddresses.length > 0) {
                        addressInfo = {
                            lat: parseFloat(rawAddresses[0].lat),
                            long: parseFloat(rawAddresses[0].lon)
                        };
                    }
                    return addressInfo;
                }
            ));
    }
}
