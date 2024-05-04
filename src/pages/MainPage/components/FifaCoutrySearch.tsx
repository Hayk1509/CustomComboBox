import { useState } from "react";
import { SelectDropdownSearch } from "../../../components/Combobox/Combobox";
import { CountriesApi } from "../../../services/CountriesApi";
import { CountryData } from "../../../types/TypesCountry";
import nunjucks from "nunjucks";
import { Flex } from "@mantine/core";
import useRequest from "../../../hooks/useRequest";
import { NunjucksTemplates } from "../../../utils/constants";

const FifaCoutrySearch = () => {
  const nunjucksTemplate = NunjucksTemplates[4];
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
      name="Find your fifa country"
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
export default FifaCoutrySearch;
