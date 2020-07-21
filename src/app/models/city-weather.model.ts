interface TempType {
  Value: number;
  Unit?: string;
  UnitType?: number;
}

interface Temperature {
  Imperial?: TempType, Metric: TempType
}

interface DayTime {
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

export interface DailyForecasts {
    Date: string;
    EpochDate: number;
    Temperature: Temperature;
    Day: DayTime;
    Night: DayTime;
    Sources: string[];
    MobileLink: string,
    Link: string

}