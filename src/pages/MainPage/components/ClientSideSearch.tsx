import { useCallback, useEffect, useState } from "react";
import { SelectDropdownSearch } from "../../../components/Combobox/Combobox";
import { CountriesApi } from "../../../services/CountriesApi";
import { CountryData } from "../../../types/TypesCountry";

const ClientSideSearch = () => {
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
        valuePropertyName="name.common"
        selectedOptionRendererTemplate="{{flag}} {{name.common}} {{name.official}}"
        availableOptionRendererTemplate="{{flag}} {{name.common}} {{name.official}}"
      />
  );
};
export default ClientSideSearch;
