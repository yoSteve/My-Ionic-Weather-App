import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class SettingsService {
   defaultLocation: any;

   constructor() {
   }

   ngOnInit() {
      console.log('SettingsService init');
      this.getDefaultLocationObject();
   }

   setDefaultLocation(city) {
     localStorage.setItem('location', JSON.stringify(city));
     this.defaultLocation = city;
   }

   getDefaultLocationObject() {
      if (localStorage.location) {
         this.defaultLocation = JSON.parse(localStorage.location);
      } else {
          this.defaultLocation = {
            name: "Vancouver, Canada",
            zmw: "00000.6.71042"
          }
      };
      return this.defaultLocation;
   }

} // end class
