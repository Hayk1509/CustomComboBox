import { Combobox, Flex, Title } from "@mantine/core";
import nunjucks from "nunjucks";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import ComboboxLayout from "./layouts/ComboboxLayout/ComboboxLayout";
import ComboboxOptions from "./components/ComboboxOptions/ComboboxOptions";
import { useDebounce } from "../../hooks/useDebounce";

export interface ISelectDrowdownSearch<D> {
  name: string;
  data: D[];
  selectedItem: D | string;
  valuePropertyName: string;
  // Templates
  selectedOptionRendererTemplate: string;
  availableOptionRendererTemplate: string;
  selectedOptionRenderer?: FC<{ data: D | string }>;
  availableOptionRenderer?: FC<{ data: D | string }>;
  // Styles
  className?: string;
  searchBoxClassName?: string;
  selectedClassName?: string;
  setSelectedItem: (value: D | string) => void;
}

interface ISelectDrowdownSearchCSR<D extends object = object>
  extends ISelectDrowdownSearch<D> {
  useServerSideSearch?: false;
}

interface ISelectDrowdownSearchSSR<D extends object = object>
  extends ISelectDrowdownSearch<D> {
  useServerSideSearch?: true;
  onOptionSearch: (search: string) => Promise<void>;
}

export const SelectDropdownSearch = <D extends object = object>(
  props: ISelectDrowdownSearchCSR<D> | ISelectDrowdownSearchSSR<D>
) => {
  const {
    name,
    data,
    selectedItem,
    setSelectedItem,
    selectedOptionRendererTemplate,
    selectedOptionRenderer,
    useServerSideSearch = false,
    valuePropertyName,
    availableOptionRenderer,
    availableOptionRendererTemplate,
    className,
    searchBoxClassName,
    selectedClassName,
  } = props;

  const [searchValue, setSearchValue] = useState<string>("");
  const [currentData, setCurrentData] = useState<D[]>(data);

  const debounce = useDebounce();
  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const handleOnChangeSearchValue = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setSearchValue(value);
    if (useServerSideSearch && value) {
      debounce(() => {
        handleOnSearchSSR(value);
      });
    } else if (value && !useServerSideSearch) {
      handleOnSearchCSR(value);
    }
  };

  const handleOnSearchSSR = async (searchValue: string) => {
    const { onOptionSearch } = props as ISelectDrowdownSearchSSR<D>;
    onOptionSearch(searchValue);
  };

  const handleOnSearchCSR = useCallback(
    (value: string) => {
      setCurrentData(() => {
        return data.filter((item) =>
          nunjucks
            .renderString(`{{${valuePropertyName}}}`, item)
            ?.toLowerCase()
            .includes(value)
        );
      });
    },
    [data, valuePropertyName]
  );

  return (
    <Flex
      mih={50}
      style={{ width: "300px" }}
      gap="sm"
      direction="column"
      wrap="nowrap"
      className={className}
    >
      <Title order={3}>{name}</Title>
      <ComboboxLayout<D>
        data={data}
        value={selectedItem}
        selectedClassName={selectedClassName}
        selectedOptionRendererTemplate={selectedOptionRendererTemplate}
        selectedOptionRenderer={selectedOptionRenderer}
        onSubmit={setSelectedItem}
      >
        <Combobox.Dropdown>
          <Combobox.Search
            className={searchBoxClassName}
            value={searchValue}
            onChange={handleOnChangeSearchValue}
            placeholder="Search countries"
          />
          <ComboboxOptions
            data={currentData}
            valuePropertyName={valuePropertyName}
            availableOptionRenderer={availableOptionRenderer}
            availableOptionRendererTemplate={availableOptionRendererTemplate}
          />
        </Combobox.Dropdown>
      </ComboboxLayout>
    </Flex>
  );
};
