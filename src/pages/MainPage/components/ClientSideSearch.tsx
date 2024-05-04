import { useEffect, useState } from "react";
import { SelectDropdownSearch } from "../../../components/Combobox/Combobox";
import { CountriesApi } from "../../../services/CountriesApi";
import { CountryData } from "../../../types/TypesCountry";
import { NunjucksTemplates } from "../../../utils/constants";
import useRequest from "../../../hooks/useRequest";

const ClientSideSearch = () => {
  const template = NunjucksTemplates[6];
  const [selectedItem, setSelectedItem] = useState<CountryData | string>("");
  const { loading, error, data, fetchData } = useRequest();
  useEffect(() => {
    fetchData(() => CountriesApi.getCountries());
  }, [fetchData]);

  return (
    <SelectDropdownSearch
      error={error}
      loading={loading}
      name="Client Side Filter"
      data={data}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      valuePropertyName={template}
      selectedOptionRendererTemplate={template}
      availableOptionRendererTemplate={template}
    />
  );
};
export default ClientSideSearch;
