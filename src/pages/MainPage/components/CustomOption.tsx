import { useEffect, useState } from "react";
import { SelectDropdownSearch } from "../../../components/Combobox/Combobox";
import { CountriesApi } from "../../../services/CountriesApi";
import { CountryData } from "../../../types/TypesCountry";
import { NunjucksTemplates } from "../../../utils/constants";
import useRequest from "../../../hooks/useRequest";
import "./index.css"
const CustomOption = () => {
  const template = NunjucksTemplates[3];
  const [selectedItem, setSelectedItem] = useState<CountryData | string>("");
  const { loading, error, data, fetchData } = useRequest();
  useEffect(() => {
    fetchData(() => CountriesApi.getCountries());
  }, [fetchData]);

  return (
    <SelectDropdownSearch
      loading={loading}
      error={error}
      name="Find country by area"
      data={data}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      valuePropertyName={template}
      selectedOptionRendererTemplate={template}
      availableOptionRendererTemplate={template}
      searchBoxClassName="colored-background-selected-item"
      isClearIcon={true}
    />
  );
};
export default CustomOption;
