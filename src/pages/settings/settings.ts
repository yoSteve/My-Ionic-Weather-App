import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherService } from '../../app/services/weather.service';
import { WeatherPage } from '../weather/weather';
import { SettingsService } from '../../app/services/settings.service';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  results: any[];
  searchStr: string;
  defaultLocation: any;
  currentDefault: string;

  constructor(public navCtrl: NavController, private weatherService: WeatherService, private settingsService: SettingsService) {
    this.getDefaultLocation();
    this.currentDefault = this.defaultLocation.name;
  }

  ngOnInit() {
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
     this.defaultLocation = this.settingsService.getDefaultLocationObject();
 }

  setDefaultLocation(city) {
    this.searchStr = city.name;
    this.defaultLocation = city;
    this.results = [];
  }

  saveChanges() {
    this.settingsService.setDefaultLocation(this.defaultLocation);
    this.currentDefault = this.defaultLocation.name;
    this.navCtrl.push(WeatherPage);
    this.searchStr = '';
  }

} // end class
