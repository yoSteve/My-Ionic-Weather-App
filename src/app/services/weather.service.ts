import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class WeatherService {
   apiKey: string;
   conditionsUrl: string;
   searchUrl: string;

   constructor(private _http: Http) {
      this.apiKey ='26fe21811065b461';
      this.conditionsUrl = `http://api.wunderground.com/api/${this.apiKey}/conditions/q/`;
      this.searchUrl = `http://localhost:8100/search/aq?query=`; // defined a proxyURL in ionic.config.json
   }

   getWeatherFromLocation(city) {
      return this._http.get(this.conditionsUrl + 'zmw:' + city.zmw + '.json')
         .map(res => res.json());
   }

   searchCities(searchStr) {
      return this._http.get(this.searchUrl + searchStr)
         .map(res => res.json());
   }
} // end class
