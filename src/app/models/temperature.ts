export interface Temperature {
  celsius: {
    min: number;
    max: number;
    current: number;
  },
  fahrenheit: {
    min: number;
    max: number;
    current: number;
  }
  weatherText: string;
  Maximum?: {
    Unit: string;
    UnitType: number;
    Value: number;
  },
  Minimum?: {
    Unit: string;
    UnitType: number;
    Value: number;
  }
}
