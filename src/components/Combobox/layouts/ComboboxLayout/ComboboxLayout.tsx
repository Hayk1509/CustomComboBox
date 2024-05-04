import { Combobox, Input, InputBase, useCombobox } from "@mantine/core";
import nunjucks from "nunjucks";
import { ReactNode, useMemo } from "react";
import { ISelectDrowdownSearch } from "../../../../types/ComboboxTypes";

nunjucks.configure({ autoescape: true });

interface IComboboxLayoutProps<D>
  extends Pick<
    ISelectDrowdownSearch<D>,
    | "selectedOptionRendererTemplate"
    | "selectedOptionRenderer"
    | "selectedClassName"
    | "data"
    | "name"
  > {
  value: D | string;
  onSubmit: (value: D | string) => void;
  children: ReactNode;
}

const ComboboxLayout = <D extends object = object>({
  children,
  data,
  onSubmit,
  value,
  name,
  selectedOptionRendererTemplate,
  selectedOptionRenderer,
  selectedClassName,
}: IComboboxLayoutProps<D>) => {
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const handleOnSubmit = (value: D | string) => {
    onSubmit(value);
    combobox.closeDropdown();
  };

  const handleOnOpenDropdown = () => {
    combobox.toggleDropdown();
  };

  const render = useMemo<ReactNode>(() => {
    if (selectedOptionRenderer) {
      const currentOption =
        data.find(
          (option) =>
            nunjucks.renderString(selectedOptionRendererTemplate, option) ===
            value
        ) || value;
      return selectedOptionRenderer({
        data: currentOption,
      });
    } else {
      return typeof value === "string"
        ? value
        : nunjucks.renderString(selectedOptionRendererTemplate, value);
    }
  }, [data, selectedOptionRenderer, selectedOptionRendererTemplate, value]);

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={handleOnSubmit}
    >
      <Combobox.Target>
        <InputBase
          className={selectedClassName}
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={handleOnOpenDropdown}
          rightSectionPointerEvents="none"
        >
          {render || <Input.Placeholder>{name}</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>
      {children}
    </Combobox>
  );
};

export default ComboboxLayout;
