import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherService } from '../../app/services/weather.service';
import { SettingsService } from '../../app/services/settings.service';

@Component({
  selector: 'weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  city: any;
  state: string;
  zmw: string;
  weather: any;
  results: any[];
  searchStr: string;

  constructor(
      public navCtrl: NavController,
      private weatherService: WeatherService,
      private settingsService: SettingsService) {
    this.getDefaultLocation();
  }

  ngOnInit() {
    this.weatherService.getWeatherFromLocation(this.city)
      .subscribe(weather => {
        this.results = weather.response.results;
        this.weather = weather.current_observation;
      })
  }

  getDefaultLocation() {
    this.city = this.settingsService.getDefaultLocationObject();
 }

  chooseCity(city) {
    this.weatherService.getWeatherFromLocation(city)
      .subscribe(weather => {
        this.weather = weather.current_observation;
        this.results = [];
      })
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

} // end Class
