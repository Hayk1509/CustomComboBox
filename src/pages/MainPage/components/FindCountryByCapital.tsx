import { useState } from "react";
import { SelectDropdownSearch } from "../../../components/Combobox/Combobox";
import useRequest from "../../../hooks/useRequest";
import { CountriesApi } from "../../../services/CountriesApi";
import { CountryData } from "../../../types/TypesCountry";
import { NunjucksTemplates } from "../../../utils/constants";

const FindCountryByCapital = () => {
  const nunjucksTemplate = NunjucksTemplates[5];
  const [selectedItem, setSelectedItem] = useState<CountryData | string>("");
  const { loading, error, data, fetchData } = useRequest();
  const getCountry = async (search: string) => {
    fetchData(() => CountriesApi.searchCountriesByCapital(search));
  };
  return (
    <SelectDropdownSearch
      loading={loading}
      error={error}
      name="Find your country by capital"
      data={data}
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
