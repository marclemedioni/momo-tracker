export interface Location {
  id?: number;
  name: string;
  shortName: string,
  capacity: {
    small: number,
    medium: number,
    large: number
  },
  currentLoad: {
    small: number,
    medium: number,
    large: number
  }
}
