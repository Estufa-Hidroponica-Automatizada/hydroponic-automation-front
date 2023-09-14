export interface Limit {
  min: number;
  max: number;
}

export interface Limits {
  airTemperature: Limit;
  waterTemperature: Limit;
  humidity: Limit;
  pH: Limit;
  condutivity: Limit;
}
