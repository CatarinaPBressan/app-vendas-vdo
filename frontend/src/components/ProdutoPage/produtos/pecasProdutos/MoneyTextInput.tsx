import React from "react";
import { Form } from "react-bootstrap";

import NumberFormat from "react-number-format";

import { PtBrNumberFormat } from "../../../../utils/numberUtils";

const MAX = 10000000000; // Dez bilhões

interface MoneyTextInputOnChange {
  formattedValue?: string;
  value?: string;
  floatValue?: Number;
  decimalFloatValue?: Number;
}

interface MoneyTextInputProps {
  required: boolean;
  name?: string;
  value?: string | number;
  onChange?(values: MoneyTextInputOnChange): void;
  disabled: boolean;
}

export const MoneyTextInput: React.FC<MoneyTextInputProps> = ({
  onChange = () => {},
  ...rest
}: MoneyTextInputProps) => {
  return (
    <NumberFormat
      thousandSeparator={"."}
      decimalSeparator={","}
      allowNegative={false}
      format={(value: any): string => {
        if (!Number(value)) {
          return PtBrNumberFormat.format(0);
        }

        return PtBrNumberFormat.format(value / 100);
      }}
      fixedDecimalScale
      inputMode="numeric"
      displayType="input"
      decimalScale={2}
      isAllowed={({ formattedValue, floatValue }) =>
        formattedValue === "" || !floatValue || floatValue / 100 <= MAX
      }
      onValueChange={(values) => {
        if (values.floatValue === undefined || values.floatValue === null) {
          return;
        }

        onChange({
          ...values,
          decimalFloatValue: parseFloat((values.floatValue / 100).toFixed(2)),
        });
      }}
      customInput={Form.Control}
      type="text"
      {...rest}
    />
  );
};
