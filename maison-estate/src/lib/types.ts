export type Locale = 'en' | 'th' | 'zh';

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
  /** Canonical English facility names — translated for display via translateFacility(). */
  facilities?: string[];
  /** One-line marketing highlight, already resolved to the current locale. */
  highlight?: string;
  /** Google Drive folder URL with building-level photos (lobby, pool, exterior — not unit photos). */
  photosUrl?: string;
}

export interface NearbyPlace {
  name:     string;
  distance: string;
}

export interface UnitTypeInfo {
  label:     string;
  sizeRange: string;
  /** Google Drive file ID for this unit type's photo. */
  imageId?:  string;
}

export interface NamedItem {
  name:        string;
  description: string;
  /** Google Drive file ID for this item's photo. */
  imageId?:    string;
}

export interface FloorBreakdownItem {
  label:       string;
  description: string;
}

export interface FactItem {
  label: string;
  value: string;
}

export interface BuildingProjectDetails {
  tagline?:  string;
  /** Google Drive file ID for the top banner. Falls back to design.imageId when not set. */
  heroImageId?: string;
  facts?:    FactItem[];
  summary?:  string[];
  location?: { description: string; nearby?: NearbyPlace[]; imageId?: string };
  design?:   { description: string; floorBreakdown?: FloorBreakdownItem[]; imageId?: string };
  unitTypes?: UnitTypeInfo[];
  unitHighlights?: string[];
  /** Google Drive file ID for a floor-by-floor facilities overview banner, shown above the facility cards. */
  facilitiesOverviewImageId?: string;
  facilities?: NamedItem[];
  innovations?: NamedItem[];
}
