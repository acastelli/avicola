import axios, { AxiosError } from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { API } from "utils/constants";
import { Callbacks, Dispatchable, parseError } from "utils/helpers";
import { Ingrediente } from "utils/ingrediente";

const API_URL = process.env.REACT_APP_API_URL || "";

const headers = {
  headers: { "content-type": "application/json" },
};

type UseingredientesType = {
  name: string;
  quantity: number;
  cost: number;
  currency: string;
  ingredientesLoader: boolean;
  data: Ingrediente[];
  setData: Dispatchable<Ingrediente[]>;
  setName: Dispatchable<string>;
  setQuantity: Dispatchable<number>;
  setCost: Dispatchable<number>;
  setCurrency: Dispatchable<string>;
  addIngrediente: (ingrediente: Ingrediente, callback?: Callbacks) => void;
  getIngredientes: (callback?: Callbacks) => void;
  deleteIngrediente: (id: string, callback?: Callbacks) => void;
  updateIngrediente: (ingrediente: Ingrediente, callback?: Callbacks) => void;
};

const IngredientesContext = createContext<UseingredientesType | undefined>(
  undefined
);

interface IngredientesProviderProps {
  children: ReactNode;
}

export const IngredientesProvider = ({
  children,
}: IngredientesProviderProps) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);
  const [currency, setCurrency] = useState("");
  const [data, setData] = useState<Ingrediente[]>([]);
  const [ingredientesLoader, setingredientesLoader] = useState(false);

  const getIngredientes = useCallback(
    (callbacks?: Callbacks) => {
      setingredientesLoader(true);
      axios
        .get(`${API_URL}${API.PRODUCTS}`, headers)
        .then((response) => {
          !!response && setData(response.data);
          if (callbacks?.success) callbacks.success();
        })
        .catch((error: AxiosError) => {
          if (callbacks?.error)
            callbacks.error(parseError(error.response?.data));
        })
        .finally(() => {
          setingredientesLoader(false);
          if (callbacks?.finally) callbacks.finally();
        });
    },
    [setData]
  );

  const addIngrediente = useCallback(
    (ingrediente: Ingrediente, callbacks?: Callbacks) => {
      axios
        .post(`${API_URL}${API.PRODUCTS}`, ingrediente, headers)
        .then((response) => {
          if (callbacks?.success) callbacks.success();
        })
        .catch((error: AxiosError) => {
          if (callbacks?.error)
            callbacks.error(parseError(error.response?.data));
        })
        .finally(() => {
          if (callbacks?.finally) callbacks.finally();
        });
    },
    []
  );

  const updateIngrediente = useCallback(
    (ingrediente: Ingrediente, callbacks?: Callbacks) => {
      axios
        .put(`${API_URL}${API.PRODUCTS}`, ingrediente, headers)
        .then((response) => {
          if (callbacks?.success) callbacks.success();
        })
        .catch((error: AxiosError) => {
          if (callbacks?.error)
            callbacks.error(parseError(error.response?.data));
        })
        .finally(() => {
          if (callbacks?.finally) callbacks.finally();
        });
    },
    []
  );

  const deleteIngrediente = useCallback((id: string, callbacks?: Callbacks) => {
    axios
      .delete(`${API_URL}${API.PRODUCTS}/${id}`, headers)
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

  const value = {
    name,
    quantity,
    cost,
    currency,
    ingredientesLoader,
    data,
    setData,
    setName,
    setQuantity,
    setCost,
    setCurrency,
    addIngrediente,
    getIngredientes,
    deleteIngrediente,
    updateIngrediente,
  };

  return (
    <IngredientesContext.Provider value={value}>
      {children}
    </IngredientesContext.Provider>
  );
};

export const useIngredientes = () => {
  const ctx = useContext(IngredientesContext);
  if (!ctx) {
    throw new Error("You are using ingredientes out of context.");
  }
  return ctx;
};
