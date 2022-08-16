export type IngredienteFormula = {
  product: {
    id: string;
    name: string;
    quantity: number;
    cost: number;
    currency: string;
  };
  quantity: number;
  totalCost: number;
};

export type FormulaObject = {
  formula: {
    id: string;
    name: string;
  };
  cost: number;
  products: IngredienteFormula[];
};

export type Formula = {
  id: string;
  name: string;
  cost: number;
  products: IngredienteFormula[];
};

export type PortionFormula = {
  id: string;
  formula: {
    id: string;
    name: string;
  };
  date: string;
  quantity: number;
};
