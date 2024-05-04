import { FC } from "react";

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
    error: string | null;
    loading?: boolean,
    isClearIcon?: boolean;
  }