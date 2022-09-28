import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import RouterProvider from "providers/routerProvider";
import { IngredientesProvider } from "hooks/useIngredientes";
import { FormulaProvider } from "hooks/useFormula";
import { StockProvider } from "hooks/useStock";
import { ResolutionProvider } from "hooks/useResolution";
import esLocale from "date-fns/locale/es";
import "./App.css";

function App() {
  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <IngredientesProvider>
          <FormulaProvider>
            <StockProvider>
              <ResolutionProvider>
                <RouterProvider />
              </ResolutionProvider>
            </StockProvider>
          </FormulaProvider>
        </IngredientesProvider>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
