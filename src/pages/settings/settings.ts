import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherService } from '../../app/services/weather.service';
import { WeatherPage } from '../weather/weather';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  results: any[];
  searchStr: string;
  defaultLocation: any;

  constructor(public navCtrl: NavController, private weatherService: WeatherService) {

  }

  ngOnInit() {
    this.getDefaultLocation();
  }

  getQuery() {
    if (this.searchStr !== "") {
      this.weatherService.searchCities(this.searchStr)
        .subscribe(res => {
          this.results = res.RESULTS;
        })
    } else {
      this.results = [];
    }
  }

  getDefaultLocation() {
     if (localStorage.getItem('location') !== undefined ) {
        this.defaultLocation = JSON.parse(localStorage.location).name;
     } else {
       this.defaultLocation = "London, UK";
     }
 }

  setDefaultLocation(city) {
    localStorage.setItem('location', JSON.stringify(city));
    this.searchStr = city.name;
    this.defaultLocation = city.name;
    this.results = [];
  }

  saveChanges() {
    this.navCtrl.push(WeatherPage);
  }

} // end class
