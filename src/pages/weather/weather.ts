import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherService } from '../../app/services/weather.service';

@Component({
  selector: 'weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  city: string;
  state: string;
  zmw: string;
  weather: any;
  results: any[];
  searchStr: string;

  constructor(public navCtrl: NavController, private weatherService: WeatherService) {
    this.city = 'Vancouver';
    this.state = 'Canada';
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
     if (localStorage.getItem('location') !== undefined ) {
        this.city = JSON.parse(localStorage.location);
        console.log("Default: ", this.city);
     }
 }

  chooseCity(city) {
    this.weatherService.getWeatherFromLocation(city)
      .subscribe(weather => {
        this.weather = weather.current_observation;
        this.results = [];
        console.log(this.weather);
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
