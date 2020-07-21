import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'forecast-day',
  templateUrl: './forecast-day.component.html',
  styleUrls: ['./forecast-day.component.scss']
})
export class ForecastDayComponent implements OnInit {

  @Input() day;
  constructor() { }

  ngOnInit(): void {
    console.log('day ::', this.day);
    
  }

}
