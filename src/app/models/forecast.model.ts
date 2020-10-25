import { Temperature } from './temperature';

export interface DailyForecasts {
    Date: string;
    EpochDate: number;
    Temperature: Temperature;
    Day: any;
    Night: any;
    Sources: string[];
    MobileLink: string,
    Link: string

}
export interface Headline {
  Category: string;
  EffectiveDate: string;
  EffectiveEpochDate: number;
  EndDate: string;
  EndEpochDate: number;
  Link: string;
  MobileLink: string;
  Severity: 7;
  Text: string;
}
export interface Forecast {
  DailyForecasts: DailyForecasts[],
  HeadLine: Headline
}
