import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, useTheme } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { AddCircleOutline } from "@material-ui/icons";
import { useFormula } from "hooks/useFormula";
import { useResolution } from "hooks/useResolution";
import { ROUTES } from "utils/constants";

import { MainContainerGrid } from "components/Layout/LayoutStyles";
import { FormulasTable } from "./FormulasTable";
import { StyledTitle } from "./FormulasStyles";
import {
  StyledButton,
  StyledIconButton,
} from "pages/Ingredientes/IngredientesStyles";

const Formulas = () => {
  const { isXs, h1 } = useResolution();
  const navigate = useNavigate();
  const { getFormulas } = useFormula();
  const [alert, setAlert] = useState<string | undefined>();
  const theme = useTheme();

  const addData = () => {
    navigate(ROUTES.ADD_FORMULA);
  };

  useEffect(() => {
    getFormulas({
      error: (msg) =>
        msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
    });
  }, [getFormulas]);

  return (
    <>
      {alert && (
        <Alert
          severity="error"
          onClose={() => {
            setAlert(undefined);
          }}
        >
          <AlertTitle>Error</AlertTitle>
          {alert}
        </Alert>
      )}
      <MainContainerGrid
        container
        justifyContent="space-between"
        alignItems="center"
        alignContent="flex-start"
        ismobile={isXs}
      >
        <Grid item xs={6}>
          <StyledTitle variant={h1} color="textPrimary" ismobile={isXs}>
            FORMULAS
          </StyledTitle>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Grid item>
            {isXs ? (
              <StyledIconButton
                backcolor={theme.palette.primary.main}
                color="secondary"
                onClick={() => addData()}
              >
                <AddCircleOutline />
              </StyledIconButton>
            ) : (
              <StyledButton
                startIcon={<AddCircleOutline />}
                onClick={() => addData()}
              >
                Formula
              </StyledButton>
            )}
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="space-between">
          <FormulasTable />
        </Grid>
      </MainContainerGrid>
    </>
  );
};
export default Formulas;
