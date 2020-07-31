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
