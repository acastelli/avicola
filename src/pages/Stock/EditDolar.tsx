import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { CircularProgress, Grid } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import { ROUTES } from "utils/constants";
import { useResolution } from "hooks/useResolution";
import { useStock } from "hooks/useStock";
import { RightBtnGrid } from "components/IngredienteForm/IngredienteFormStyles";
import { MainContainerGrid } from "components/Layout/LayoutStyles";
import { CustomButtons, StyledField, StyledTitle } from "./EditDolarStyles";

const EditDolar = () => {
  const { handleSubmit, control } = useForm();
  const { isXs, h1 } = useResolution();

  const navigate = useNavigate();
  const { editDolar, getDolar, dolar, dolarLoader } = useStock();
  const [alert, setAlert] = useState<string | undefined>();

  useEffect(() => {
    getDolar({
      error: (msg) =>
        msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
    });
  }, [getDolar]);

  const onSubmit = (data: any) => {
    editDolar(data.dolar, {
      success: () => navigate(ROUTES.HOME),
      error: (msg) =>
        msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
    });
  };

  const handleClose = () => {
    navigate(ROUTES.HOME);
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
      {dolar && (
        <MainContainerGrid
          container
          justifyContent={"space-between"}
          alignItems="center"
          direction={"column"}
          alignContent={"center"}
          ismobile={isXs}
        >
          <Grid item>
            <StyledTitle variant={h1} color="textPrimary" ismobile={isXs}>
              MODIFICAR COTIZACIÓN
            </StyledTitle>
          </Grid>
          <Grid item justifyContent="center">
            {dolarLoader ? (
              <CircularProgress />
            ) : (
              <Grid item xs={12} justifyContent="center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="dolar"
                    control={control}
                    defaultValue={dolar}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <StyledField
                        label="Dolar"
                        variant="filled"
                        fullWidth
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        type="number"
                      />
                    )}
                    rules={{ required: "Dolar es requerido" }}
                  />
                  <Grid item container xs={12} justifyContent="flex-end">
                    <Grid item>
                      <CustomButtons variant="contained" onClick={handleClose}>
                        Cancelar
                      </CustomButtons>
                    </Grid>
                    <RightBtnGrid item>
                      <CustomButtons type="submit" startIcon={<Save />}>
                        Guardar
                      </CustomButtons>
                    </RightBtnGrid>
                  </Grid>
                </form>
              </Grid>
            )}
          </Grid>
        </MainContainerGrid>
      )}
    </>
  );
};

export default EditDolar;
