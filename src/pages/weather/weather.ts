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
  weather: any;
  results: any[];
  selected: string;
  searchStr: string;

  constructor(public navCtrl: NavController, private weatherService: WeatherService) {
    this.city = 'Vancouver';
    this.state = 'Canada';
  }

  ngOnInit() {
    this.weatherService.getWeather(this.city, this.state)
      .subscribe(weather => {
        this.results = weather.response.results;
        this.weather = weather.current_observation;
      })
  }

  onClickSelected(result) {
    this.weatherService.getWeatherFromSelected(result.zmw)
      .subscribe(weather => {
        this.weather = weather.current_observation;
        this.results = null;
      })
  }

  getQuery() {
    if (this.searchStr !== "") {
      this.weatherService.searchCities(this.searchStr)
        .subscribe(res => {
          this.results = res.RESULTS;
          console.log(this.results);
        })
    } else {
      this.results = null;
    }
 }

} // end Class
