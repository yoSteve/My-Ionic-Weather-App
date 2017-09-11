import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class WeatherService {
   http: any;
   apiKey: string;
   conditionsUrl: string;

   constructor(private _http: Http) {
      this.http = _http;
      this.apiKey ='26fe21811065b461';
      this.conditionsUrl = `http://api.wunderground.com/api/${this.apiKey}/conditions/q/`;
   }

   getWeather(city, state) {
      return this.http.get(this.conditionsUrl + state + '/' + city + '.json')
         .map(res => res.json());
   }

   getWeatherFromSelected(zmw) {
      return this.http.get(this.conditionsUrl + 'zmw:' + zmw + '.json')
         .map(res => res.json());
   }
} // end class