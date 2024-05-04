import { useState } from "react";
import { SelectDropdownSearch } from "../../../components/Combobox/Combobox";
import { CountriesApi } from "../../../services/CountriesApi";
import { CountryData } from "../../../types/TypesCountry";
import nunjucks from "nunjucks";
import { NunjucksTemplates } from "../../../utils/constants";
import { Flex } from "@mantine/core";

const ServerSideSearch = () => {
  const nunjucksTemplate = NunjucksTemplates[0];
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [selectedItem, setSelectedItem] = useState<CountryData | string>("");
  const [error, setError] = useState<null | string>(null);
  const getCountry = async (search: string) => {
    const { data, error } = await CountriesApi.searchCountries(search);
    if (data) {
      setCountries(data);
    } else {
      setError(error);
    }
  };

  return (
    <SelectDropdownSearch
      error={error}
      selectedOptionRenderer={(value: { data: CountryData | string }) => {
        const { data } = value as unknown as { data: CountryData };
        return (
          data && (
            <Flex>
              <span className="span">
                {nunjucks.renderString("{{flag}}", data)}
              </span>
              <small>{nunjucks.renderString(nunjucksTemplate, data)}</small>
            </Flex>
          )
        );
      }}
      name="Server Side Filter"
      data={countries}
      selectedItem={selectedItem}
      useServerSideSearch
      onOptionSearch={getCountry}
      setSelectedItem={setSelectedItem}
      valuePropertyName="{{name.common}}"
      selectedOptionRendererTemplate={nunjucksTemplate}
      availableOptionRendererTemplate={nunjucksTemplate}
    />
  );
};
export default ServerSideSearch;
