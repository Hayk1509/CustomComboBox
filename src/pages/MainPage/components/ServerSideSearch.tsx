import { useState } from "react";
import { SelectDropdownSearch } from "../../../components/Combobox/Combobox";
import { CountriesApi } from "../../../services/CountriesApi";
import { CountryData } from "../../../types/TypesCountry";
import nunjucks from "nunjucks";
import { NunjucksTemplates } from "../../../utils/constants";
const ServerSideSearch = () => {
  const nunjucksTemplate = NunjucksTemplates[2];
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [selectedItem, setSelectedItem] = useState<CountryData | string>("");
  const getCountry = async (search: string) => {
    const { data } = await CountriesApi.searchCountries(search);
    const newData = data.map((country) => ({
      ...country,
      language: Object.values(country.languages),
    }));
    setCountries(newData);
  };

  return (
    <SelectDropdownSearch
      selectedOptionRenderer={(value: { data: CountryData | string }) => {
        const { data } = value as unknown as { data: CountryData };
        return (
          <>
            <span className="span">
              {nunjucks.renderString("{{flag}}", data)}
            </span>
            {nunjucks.renderString(nunjucksTemplate, data)}
          </>
        );
      }}
      name="Server Side Filter"
      data={countries}
      selectedItem={selectedItem}
      useServerSideSearch
      onOptionSearch={getCountry}
      setSelectedItem={setSelectedItem}
      valuePropertyName="name.common"
      selectedOptionRendererTemplate={nunjucksTemplate}
      availableOptionRendererTemplate={nunjucksTemplate}
    />
  );
};
export default ServerSideSearch;
