import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayWeatherComponent } from './day-weather.component';

describe('DayWeatherComponent', () => {
  let component: DayWeatherComponent;
  let fixture: ComponentFixture<DayWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
