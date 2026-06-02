export interface Property {
  project:   string;
  unit:      string;
  floor:     string;
  unitType:  string;
  area:      string | number;
  direction: string;
  price:     string | number;
  driveUrl:  string;
}

export interface BuildingMeta {
  area: string;
  bts:  string;
}

export interface BuildingData {
  district:   string;
  bts:        string;
  floors?:    number;
  units?:     number;
  year?:      number;
  facilities?: string[];
  highlight?: string;
}
