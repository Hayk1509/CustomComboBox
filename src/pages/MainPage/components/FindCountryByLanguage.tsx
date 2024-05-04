import { useState } from "react";
import { SelectDropdownSearch } from "../../../components/Combobox/Combobox";
import { CountriesApi } from "../../../services/CountriesApi";
import { CountryData } from "../../../types/TypesCountry";
import { NunjucksTemplates } from "../../../utils/constants";
const FindCountryByLanguage = () => {
  const nunjucksTemplate = NunjucksTemplates[2];
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [selectedItem, setSelectedItem] = useState<CountryData | string>("");
  const getCountry = async (search: string) => {
    const { data } = await CountriesApi.searchCountriesByLang(search);
    setCountries(data);
  };

  return (
    <SelectDropdownSearch
      name="Find your country by language"
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
export default FindCountryByLanguage;
