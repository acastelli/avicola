import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useResolution } from "hooks/useResolution";
import { AlertGrid, StyledGrid, StyledTitle } from "./IngredientsStockStyles";
import IngredientsStockTable from "./IngredientsStockTable";

import { useIngredientes } from "hooks/useIngredientes";

const IngredientsStock = () => {
  const { isXs, h1 } = useResolution();
  const { data, getIngredientes } = useIngredientes();
  const [alert, setAlert] = useState<string | undefined>();

  useEffect(() => {
    getIngredientes({
      error: (msg) =>
        msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
    });
  }, [getIngredientes]);

  return (
    <>
      <StyledGrid
        item
        xs={12}
        container
        justifyContent="center"
        alignContent="flex-start"
        ismobile={String(isXs)}
      >
        <AlertGrid
          item
          container
          justifyContent="center"
          ismobile={String(isXs)}
        >
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
        </AlertGrid>

        <Grid item xs={12}>
          <StyledTitle variant={h1} color="textPrimary" ismobile={String(isXs)}>
            STOCK DE INGREDIENTES
          </StyledTitle>
        </Grid>
        <Grid item xs={12} md={7}>
          <IngredientsStockTable ingredients={data} />
        </Grid>
      </StyledGrid>
    </>
  );
};
export default IngredientsStock;
