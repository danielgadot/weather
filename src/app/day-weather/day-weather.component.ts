import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'day-weather',
  templateUrl: './day-weather.component.html',
  styleUrls: ['./day-weather.component.scss']
})
export class DayWeatherComponent implements OnInit {

  cityTitle: string = 'Tel-aviv';
  Description: string = 'Sunny';
  tempeture: number = 38;
  @Input() day;

  constructor() { }

  ngOnInit(): void {
  }

}
