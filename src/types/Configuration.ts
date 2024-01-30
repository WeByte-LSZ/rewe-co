export interface Data {
  [key: string]: {
    [category: string]: Datapoint
  };
}

export interface Datapoint {
  [key: string]: number
}
