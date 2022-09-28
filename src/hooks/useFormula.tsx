import axios, { AxiosError } from "axios";
import { NewFormula } from "components/FormulaForm/FormulaForm";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { API } from "utils/constants";
import {
  Formula,
  FormulaObject,
  IngredienteFormula,
  PortionFormula,
} from "utils/formula";
import { Callbacks, Dispatchable, parseError } from "utils/helpers";

const API_URL = process.env.REACT_APP_API_URL || "";

const headers = {
  headers: { "content-type": "application/json" },
};

type UseFormulaType = {
  ingredientes: IngredienteFormula[];
  formulas: Formula[];
  setFormulas: Dispatchable<Formula[]>;
  portionsFormulas: PortionFormula[];
  formulasLoader: boolean;
  portionsLoader: boolean;
  setingredientes: Dispatchable<IngredienteFormula[]>;
  getFormulas: (callback?: Callbacks) => void;
  addFormula: (data: NewFormula, callback?: Callbacks) => void;
  editFormula: (data: NewFormula, callback?: Callbacks) => void;
  getPortionsFormulas: (callback?: Callbacks, date?: string) => void;
  deleteFormula: (id: string, callback?: Callbacks) => void;
};

const FormulaContext = createContext<UseFormulaType | undefined>(undefined);

interface FormulaProviderProps {
  children: ReactNode;
}

export const FormulaProvider = ({ children }: FormulaProviderProps) => {
  const [ingredientes, setingredientes] = useState<IngredienteFormula[]>([]);
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [portionsFormulas, setPortionFormulas] = useState<PortionFormula[]>([]);
  const [formulasLoader, setFormualasLoader] = useState(false);
  const [portionsLoader, setPortionsLoader] = useState(false);

  const addFormula = useCallback((data: NewFormula, callbacks?: Callbacks) => {
    axios
      .post(
        `${API_URL}${API.ADD_FORMULA}`,
        {
          formula: {
            name: data.name,
          },
          products: data.products?.map((p) => {
            return { productId: p.id, quantity: p.quantity };
          }),
        },
        headers
      )
      .then((response) => {
        if (callbacks?.success) callbacks.success();
      })
      .catch((error: AxiosError) => {
        if (callbacks?.error) callbacks.error(parseError(error.response?.data));
      })
      .finally(() => {
        if (callbacks?.finally) callbacks.finally();
      });
  }, []);

  const editFormula = useCallback((data: NewFormula, callbacks?: Callbacks) => {
    axios
      .post(
        `${API_URL}${API.EDIT_FORMULA}`,
        {
          formula: {
            name: data.name,
          },
          products: data.products?.map((p) => {
            return { productId: p.id, quantity: p.quantity };
          }),
        },
        headers
      )
      .then((response) => {
        if (callbacks?.success) callbacks.success();
      })
      .catch((error: AxiosError) => {
        if (callbacks?.error) callbacks.error(parseError(error.response?.data));
      })
      .finally(() => {
        if (callbacks?.finally) callbacks.finally();
      });
  }, []);

  const deleteFormula = useCallback((id: string, callbacks?: Callbacks) => {
    axios
      .delete(`${API_URL}${API.FORMULAS}/${id}`, headers)
      .then((response) => {
        if (callbacks?.success) callbacks.success();
      })
      .catch((error: AxiosError) => {
        if (callbacks?.error) callbacks.error(parseError(error.response?.data));
      })
      .finally(() => {
        if (callbacks?.finally) callbacks.finally();
      });
  }, []);

  const getFormulas = useCallback(
    (callbacks?: Callbacks) => {
      setFormualasLoader(true);
      axios
        .get(`${API_URL}${API.FORMULAS}`, headers)
        .then((response) => {
          !!response &&
            setFormulas(
              response.data.map((f: FormulaObject) => {
                return {
                  cost: isNaN(f.cost) ? 0 : f.cost,
                  id: f.formula.id,
                  name: f.formula.name,
                  products: f.products,
                };
              })
            );
          if (callbacks?.success) callbacks.success();
        })
        .catch((error: AxiosError) => {
          if (callbacks?.error)
            callbacks.error(parseError(error.response?.data));
        })
        .finally(() => {
          setFormualasLoader(false);
          if (callbacks?.finally) callbacks.finally();
        });
    },
    [setFormulas]
  );

  const getPortionsFormulas = useCallback(
    (callbacks?: Callbacks, date?: string) => {
      setPortionsLoader(true);
      let url = date
        ? `${API_URL}${API.PORTIONS}?date=${date}`
        : `${API_URL}${API.PORTIONS}`;
      axios
        .get(url, headers)
        .then((response) => {
          !!response &&
            setPortionFormulas(
              (response.data as PortionFormula[]).sort(function (a, b) {
                return a.formula.name.localeCompare(b.formula.name);
              })
            );
          if (callbacks?.success) callbacks.success();
        })
        .catch((error: AxiosError) => {
          if (callbacks?.error)
            callbacks.error(parseError(error.response?.data));
        })
        .finally(() => {
          setPortionsLoader(false);
          if (callbacks?.finally) callbacks.finally();
        });
    },
    []
  );

  const value = {
    ingredientes,
    formulas,
    setFormulas,
    portionsFormulas,
    formulasLoader,
    portionsLoader,
    setingredientes,
    getFormulas,
    getPortionsFormulas,
    addFormula,
    deleteFormula,
    editFormula,
  };

  return (
    <FormulaContext.Provider value={value}>{children}</FormulaContext.Provider>
  );
};

export const useFormula = () => {
  const ctx = useContext(FormulaContext);
  if (!ctx) {
    throw new Error("You are using Formula out of context.");
  }
  return ctx;
};
