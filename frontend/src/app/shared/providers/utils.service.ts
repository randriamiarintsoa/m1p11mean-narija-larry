import { Injectable } from '@angular/core';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class UtilsService {
    constructor(
        private location: Location
    ) { }
    
    back() {
        return this.location.back();
    }
}
