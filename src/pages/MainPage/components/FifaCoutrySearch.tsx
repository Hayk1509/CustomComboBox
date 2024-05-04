import { useState } from "react";
import { SelectDropdownSearch } from "../../../components/Combobox/Combobox";
import { CountriesApi } from "../../../services/CountriesApi";
import { CountryData } from "../../../types/TypesCountry";
import nunjucks from "nunjucks";
import { NunjucksTemplates } from "../../../utils/constants";
import { Flex } from "@mantine/core";
const FifaCoutrySearch = () => {
  const nunjucksTemplate = NunjucksTemplates[4];
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [selectedItem, setSelectedItem] = useState<CountryData | string>("");
  const getCountry = async (search: string) => {
    const { data } = await CountriesApi.searchCountries(search);
    setCountries(data);
  };
  return (
    <SelectDropdownSearch
      selectedOptionRenderer={(value: { data: CountryData | string }) => {
        const { data } = value as unknown as { data: CountryData };
        return data && (
          <Flex>
            <span className="span">
              {nunjucks.renderString("{{flag}}", data)}
            </span>
            <small>{nunjucks.renderString(nunjucksTemplate, data)}</small>
          </Flex>
        );
      }}
      name="Find your fifa country"
      data={countries}
      selectedItem={selectedItem}
      useServerSideSearch
      onOptionSearch={getCountry}
      setSelectedItem={setSelectedItem}
      valuePropertyName="{{fifa}}"
      selectedOptionRendererTemplate={nunjucksTemplate}
      availableOptionRendererTemplate={nunjucksTemplate}
    />
  );
};
export default FifaCoutrySearch;
