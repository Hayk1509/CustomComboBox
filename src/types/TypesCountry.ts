export interface CountryData {
  [x: string]: { [s: string]: unknown; } | ArrayLike<unknown>;
  name: {
    common: string;
    official: string;
  };
}
