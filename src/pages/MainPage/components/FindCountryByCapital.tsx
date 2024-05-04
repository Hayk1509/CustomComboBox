import { useState } from "react";
import { SelectDropdownSearch } from "../../../components/Combobox/Combobox";
import { CountriesApi } from "../../../services/CountriesApi";
import { CountryData } from "../../../types/TypesCountry";
import { NunjucksTemplates } from "../../../utils/constants";
const FindCountryByCapital = () => {
  const nunjucksTemplate = NunjucksTemplates[5];
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [selectedItem, setSelectedItem] = useState<CountryData | string>("");
  const getCountry = async (search: string) => {
    const { data } = await CountriesApi.searchCountriesByCapital(search);
    setCountries(data);
  };

  return (
    <SelectDropdownSearch
      name="Find your country by capital"
      data={countries}
      selectedItem={selectedItem}
      useServerSideSearch
      onOptionSearch={getCountry}
      setSelectedItem={setSelectedItem}
      valuePropertyName={nunjucksTemplate}
      selectedOptionRendererTemplate={nunjucksTemplate}
      availableOptionRendererTemplate={nunjucksTemplate}
    />
  );
};
export default FindCountryByCapital;
