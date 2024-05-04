import { Box, Combobox } from "@mantine/core";
import nunjucks from "nunjucks";
import { ISelectDrowdownSearch } from "../../Combobox";
import { ReactNode, useCallback } from "react";
import { IconCheck } from "@tabler/icons-react";
interface IComboboxOptionsProps<D>
  extends Pick<
    ISelectDrowdownSearch<D>,
    | "data"
    | "availableOptionRendererTemplate"
    | "availableOptionRenderer"
    | "valuePropertyName"
    | "selectedItem"
  > {}

const ComboboxOptions = <D extends object = object>({
  data,
  valuePropertyName,
  availableOptionRenderer,
  availableOptionRendererTemplate,
  selectedItem,
}: IComboboxOptionsProps<D>) => {
  const render = useCallback<(item: D) => ReactNode>(
    (item: D) => {
      const value: string = nunjucks.renderString(valuePropertyName, item);
      if (availableOptionRenderer) {
        return (
          <Combobox.Option key={value} value={value}>
            {availableOptionRenderer({ data: item })}
          </Combobox.Option>
        );
      } else {
        return (
          <Combobox.Option
            style={{ display: "flex" }}
            key={value}
            value={value}
          >
            <Box style={{ width: "30px", height: "30px" }}>
              {nunjucks.renderString(valuePropertyName, item) ===
                selectedItem && <IconCheck stroke={2} />}
            </Box>
            {typeof item === "string"
              ? item
              : nunjucks.renderString(availableOptionRendererTemplate, item)}
          </Combobox.Option>
        );
      }
    },
    [
      availableOptionRenderer,
      availableOptionRendererTemplate,
      selectedItem,
      valuePropertyName,
    ]
  );

  return (
    <Combobox.Options>
      {data.length > 0 ? (
        data.map(render)
      ) : (
        <Combobox.Empty>Nothing found</Combobox.Empty>
      )}
    </Combobox.Options>
  );
};

export default ComboboxOptions;
