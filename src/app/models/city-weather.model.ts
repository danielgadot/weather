export interface TempType {
  Value: number;
  Unit?: string;
  UnitType?: number;
}

export interface Temperature {
  Imperial?: TempType, Metric: TempType
}

export interface DayTime {
  Icon: number,
  IconPhrase: string,
  HasPrecipitation: boolean
}

export interface CityWeather {
  EpochTime?: number;
  HasPrecipitation?: boolean;
  IsDayTime?: boolean;
  Link?: string;
  LocalObservationDateTime?: string;
  MobileLink?: string;
  PrecipitationType?: any
  Temperature: Temperature;
  WeatherIcon?: number;
  WeatherText?: string;
}




