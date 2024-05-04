import { useCallback, useEffect, useState } from "react";
import { SelectDropdownSearch } from "../../../components/Combobox/Combobox";
import { CountriesApi } from "../../../services/CountriesApi";
import { CountryData } from "../../../types/TypesCountry";
import { NunjucksTemplates } from "../../../utils/constants";

const ClientSideSearch = () => {
  const template = NunjucksTemplates[6]
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [selectedItem, setSelectedItem] = useState<CountryData | string>("");

  const getCountries = useCallback(async () => {
    const { data } = await CountriesApi.getCountries();
    setCountries(data);
  }, []);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  return (
      <SelectDropdownSearch
        name="Client Side Filter"
        data={countries}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        valuePropertyName={template}
        selectedOptionRendererTemplate={template}
        availableOptionRendererTemplate={template}
      />
  );
};
export default ClientSideSearch;
