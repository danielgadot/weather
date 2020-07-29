import { Temperature, DayTime} from './city.model'

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
