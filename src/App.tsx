import React from "react";
import "./App.css";
import RouterProvider from "providers/routerProvider";
import { IngredientesProvider } from "hooks/useIngredientes";
import { FormulaProvider } from "hooks/useFormula";
import { StockProvider } from "hooks/useStock";
import { ResolutionProvider } from "hooks/useResolution";

function App() {
  return (
    <div className="App">
      <IngredientesProvider>
        <FormulaProvider>
          <StockProvider>
            <ResolutionProvider>
              <RouterProvider />
            </ResolutionProvider>
          </StockProvider>
        </FormulaProvider>
      </IngredientesProvider>
    </div>
  );
}

export default App;
