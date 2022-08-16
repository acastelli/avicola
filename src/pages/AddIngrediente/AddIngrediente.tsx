import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { ROUTES } from "utils/constants";
import { Ingrediente } from "utils/ingrediente";
import { useIngredientes } from "hooks/useIngredientes";
import { useResolution } from "hooks/useResolution";
import IngrdienteForm from "components/IngredienteForm/IngredienteForm";
import { MainContainerGrid } from "components/Layout/LayoutStyles";
import { StyledTitle } from "./AddIngredienteStyles";

const AddIngrediente = () => {
  const navigate = useNavigate();
  const { isXs, h1 } = useResolution();
  const { addIngrediente } = useIngredientes();
  const [alert, setAlert] = useState<string | undefined>();

  const onSubmit = (data: Ingrediente) => {
    addIngrediente(data, {
      success: () => navigate(ROUTES.INGREDIENTES),
      error: (msg) =>
        msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
    });
  };

  const handleClose = () => {
    navigate(ROUTES.INGREDIENTES);
  };

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
        justifyContent={isXs ? "flex-start" : "space-between"}
        alignItems="center"
        direction="column"
        ismobile={isXs}
      >
        <Grid item>
          <StyledTitle variant={h1} color="textPrimary" ismobile={isXs}>
            AGREGAR INGREDIENTE
          </StyledTitle>
        </Grid>
        <Grid item>
          <IngrdienteForm
            onSubmit={(data) => onSubmit(data)}
            handleClose={handleClose}
          />
        </Grid>
      </MainContainerGrid>
    </>
  );
};

export default AddIngrediente;
