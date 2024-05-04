import { useCallback, useEffect, useState } from "react";
import { SelectDropdownSearch } from "../../../components/Combobox/Combobox";
import { CountriesApi } from "../../../services/CountriesApi";
import { CountryData } from "../../../types/TypesCountry";
import { NunjucksTemplates } from "../../../utils/constants";

const CustomOption = () => {
    const template = NunjucksTemplates[3]
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
        name="Find country by area"
        data={countries}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        valuePropertyName={template}
        selectedOptionRendererTemplate={template}
        availableOptionRendererTemplate={template}
      />
  );
};
export default CustomOption;
