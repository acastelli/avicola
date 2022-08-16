import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTheme } from "theme";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { ROUTES } from "utils/constants";
import Formulas from "pages/Formulas/Formulas";
import Stock from "pages/Stock/Stock";
import EditDolar from "pages/Stock/EditDolar";
import Version from "pages/Version/version";
import AddFormula from "pages/AddFormula/AddFormula";
import Ingredientes from "pages/Ingredientes/Ingredientes";
import Layout from "components/Layout/Layout";
import AddIngrediente from "pages/AddIngrediente/AddIngrediente";

const RouterProvider = () => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path={ROUTES.INGREDIENTES} element={<Ingredientes />} />
            <Route path={ROUTES.ADD_INGREDIENTE} element={<AddIngrediente />} />
            <Route path={ROUTES.EDIT_DOLAR} element={<EditDolar />} />
            <Route path={ROUTES.FORMULAS} element={<Formulas />} />
            <Route path={ROUTES.ADD_FORMULA} element={<AddFormula />} />
            <Route path={ROUTES.EDIT_FORMULA} element={<AddFormula />} />
            <Route path={ROUTES.VERSION} element={<Version />} />
            <Route path={ROUTES.HOME} element={<Stock />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default RouterProvider;
