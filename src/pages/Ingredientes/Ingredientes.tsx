import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, useTheme } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Table } from "components/common/Table/Table";
import { MainContainerGrid, Title } from "components/Layout/LayoutStyles";
import { useIngredientes } from "hooks/useIngredientes";
import { useResolution } from "hooks/useResolution";
import { ROUTES } from "utils/constants";
import {
  StyledButton,
  StyledGrid,
  StyledIconButton,
} from "./IngredientesStyles";

const Ingredientes = () => {
  const navigate = useNavigate();
  const { getIngredientes } = useIngredientes();
  const { isXs, h1 } = useResolution();
  const theme = useTheme();

  const [alert, setAlert] = useState<string | undefined>();
  const [updateIngrediente, setUpdateIngrediente] = useState(true);

  const addData = () => {
    navigate(ROUTES.ADD_INGREDIENTE);
  };

  useEffect(() => {
    updateIngrediente &&
      getIngredientes({
        error: (msg) =>
          msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
      });
    setUpdateIngrediente(false);
  }, [getIngredientes, updateIngrediente]);

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
        alignContent="flex-start"
        alignItems={isXs ? "flex-start" : "center"}
        ismobile={isXs}
      >
        <Grid item xs={6}>
          <Title variant={h1} color="textPrimary" ismobile={isXs}>
            Ingredientes
          </Title>
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
                Ingrediente
              </StyledButton>
            )}
          </Grid>
        </Grid>
        <StyledGrid item xs={12} container ismobile={isXs}>
          <Table
            setAlert={setAlert}
            setUpdateIngrediente={setUpdateIngrediente}
          />
        </StyledGrid>
      </MainContainerGrid>
    </>
  );
};
export default Ingredientes;
