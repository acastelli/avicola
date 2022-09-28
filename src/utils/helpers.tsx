import { Dispatch, SetStateAction } from "react";

export type Callbacks = {
  success?: () => void;
  error?: (value?: string) => void;
  finally?: () => void;
};

export type Dispatchable<T> = Dispatch<SetStateAction<T>>;

export type ColorProp = {
  backcolor: string;
  hovercolor?: string;
};

export type ResolutionProps = {
  ismobile: string;
};

type Error = {
  code: string;
  msg: string;
};

export const ErrorMsg: Error[] = [
  {
    code: "QUANTITY_CONSUMED_NOT_COULD_BE_NEGATIVE_TO_THIS_FORMULA",
    msg: "La cantidad consumida no puede ser negativa para esta formula.",
  },
  {
    code: "IT_CANNOT_DECREASE_MORE_PRODUCTS_THAT_IT_HAS",
    msg: "La cantidad de canchadas que desea consumir supera el stock",
  },
  {
    code: "CONSTRAINT_VIOLATION_DATABASE",
    msg: "El elemento esta vinculado con otro elemento",
  },
  {
    code: "IS_NECESSARY_SET_CURRENCY_USD",
    msg: "Es necesario ingresar el tipo de moneda en dolares",
  },
  {
    code: "NOT_FOUND_FORMULAS_CONSUMED",
    msg: "No se encontro la formula que desea consumir",
  },
  {
    code: "FORMULA_NOT_EXIST",
    msg: "La formula no existe",
  },
  {
    code: "PRODUCT_NOT_EXIST",
    msg: "El producto no existe",
  },
  {
    code: "FORMULA_NAME_DUPLICATED",
    msg: "Ya existe una formula con el nombre ingresado",
  },
  {
    code: "PRODUCT_NAME_DUPLICATED",
    msg: "Ya existe un producto con el nombre ingresado",
  },
  {
    code: "QUANTITY_GREATER_THAN_ZERO",
    msg: "La cantidad debe ser mayor que cero",
  },
];

export const parseError = (msg: string) => {
  return ErrorMsg.find((x) => x.code === msg)?.msg || "Ocurrio un error";
};
