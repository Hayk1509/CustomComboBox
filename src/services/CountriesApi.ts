import Api from "./api";
import { CountryData } from "../types/TypesCountry";

export class CountriesApi {
  static async getCountries(): Promise<{ data: CountryData[] | null, error: string | null }> {
    try {
      const response = await Api.Instance.get("/all");
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: "Failed to fetch countries" };
    }
  }

  static async searchCountries(searchValue: string = ""): Promise<{ data: CountryData[] | null, error: string | null }> {
    try {
      const response = await Api.Instance.get(`/name/${searchValue}`);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: "Failed to search countries" };
    }
  }

  static async searchCountriesByCapital(searchValue: string = ""): Promise<{ data: CountryData[] | null, error: string | null }> {
    try {
      const response = await Api.Instance.get(`/capital/${searchValue}`);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: "Failed to search countries by capital" };
    }
  }

  static async searchCountriesByLang(searchValue: string = ""): Promise<{ data: CountryData[] | null, error: string | null }> {
    try {
      const response = await Api.Instance.get(`/lang/${searchValue}`);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: "Failed to search countries by language" };
    }
  }
}
