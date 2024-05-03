import axios, { AxiosInstance } from "axios";

const baseURL = "https://restcountries.com/v3.1";

export default class Api {
  private static _axios: AxiosInstance = axios.create({
    baseURL,
    responseType: "json",
  });
  static get Instance() {
    return this._axios;
  }
}
