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

  constructor(public navCtrl: NavController, private weatherService: WeatherService) {
    this.city = 'Vancouver';
    this.state = 'BC';
  }

  ngOnInit() {
    this.weatherService.getWeather(this.city, this.state)
      .subscribe(weather => {
        this.results = weather.response.results;
        this.weather = weather.current_observation;
        console.log(weather);
      })
  }

  onClickSelected(result) {
    console.log("ZMW: " + result.zmw);
    this.weatherService.getWeatherFromSelected(result.zmw)
      .subscribe(weather => {
        this.weather = weather.current_observation;
        this.results = null;
      })
  }

}
