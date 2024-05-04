import { Flex } from "@mantine/core";
import { useState } from "react";
import { SelectDropdownSearch } from "../../../components/Combobox/Combobox";
import useRequest from "../../../hooks/useRequest";
import { CountriesApi } from "../../../services/CountriesApi";
import { CountryData } from "../../../types/TypesCountry";
import { NunjucksTemplates } from "../../../utils/constants";
import nunjucks from "nunjucks";

const ServerSideSearch = () => {
  const nunjucksTemplate = NunjucksTemplates[0];
  const [selectedItem, setSelectedItem] = useState<CountryData | string>("");
  const { loading, error, data, fetchData } = useRequest();
  const getCountry = async (search: string) => {
    fetchData(() => CountriesApi.searchCountries(search));
  };

  return (
    <SelectDropdownSearch
      error={error}
      loading={loading}
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
      data={data}
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
