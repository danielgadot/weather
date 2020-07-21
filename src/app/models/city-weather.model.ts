interface TempType {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface CityWeather {
  EpochTime: number;
  HasPrecipitation: boolean;
  IsDayTime: boolean;
  Link: string;
  LocalObservationDateTime: string;
  MobileLink: string;
  PrecipitationType: any
  Temperature: {Imperial: TempType, Metric: TempType};
  WeatherIcon: number;
  WeatherText: string;
}
