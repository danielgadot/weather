import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteWeatherCardComponent } from './favorite-weather-card.component';

describe('FavoriteWeatherCardComponent', () => {
  let component: FavoriteWeatherCardComponent;
  let fixture: ComponentFixture<FavoriteWeatherCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteWeatherCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
