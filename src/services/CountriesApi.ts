import { AxiosResponse } from "axios";
import Api from "./api";
import { CountryData } from "../types/TypesCountry";

export class CountriesApi {
  static getCountries() {
    return Api.Instance.get("/all");
  }
  static searchCountries(
    searchValue: string = ""
  ): Promise<AxiosResponse<CountryData[], any>> {
    return Api.Instance.get(`/name/${searchValue}`);
  }
}
