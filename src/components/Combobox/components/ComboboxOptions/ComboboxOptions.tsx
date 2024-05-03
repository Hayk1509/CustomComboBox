import { Combobox } from "@mantine/core";
import nunjucks from "nunjucks";
import { ISelectDrowdownSearch } from "../../Combobox";
import { ReactNode, useCallback } from "react";

interface IComboboxOptionsProps<D>
  extends Pick<
    ISelectDrowdownSearch<D>,
    | "data"
    | "availableOptionRendererTemplate"
    | "availableOptionRenderer"
    | "valuePropertyName"
  > {}

const ComboboxOptions = <D extends object = object>({
  data,
  valuePropertyName,
  availableOptionRenderer,
  availableOptionRendererTemplate,
}: IComboboxOptionsProps<D>) => {
  const render = useCallback<(item: D) => ReactNode>(
    (item: D) => {
      if (availableOptionRenderer) {
        const value = nunjucks.renderString(`{{${valuePropertyName}}}`, item);
        return (
          <Combobox.Option key={value} value={value}>
            {availableOptionRenderer({ data: item })}
          </Combobox.Option>
        );
      } else {
        return (
          <Combobox.Option
            key={nunjucks.renderString(`{{${valuePropertyName}}}`, item)}
            value={nunjucks.renderString(`{{${valuePropertyName}}}`, item)}
          >
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
