import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Grid, MenuItem, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Save } from "@material-ui/icons";
import { Ingrediente } from "utils/ingrediente";
import { useIngredientes } from "hooks/useIngredientes";
import { useResolution } from "hooks/useResolution";
import { currencies } from "components/IngredienteForm/IngredienteForm";
import { RightBtnGrid } from "components/FormulaForm/FormulaFormStyles";
import { MainContainerGrid } from "components/Layout/LayoutStyles";
import { CustomButtons, StyledField, StyledTitle } from "./AddStockStyles";

type AddStockProps = {
  ingrediente: Ingrediente;
  handleClose: () => void;
};

const AddStock = ({ ingrediente, handleClose }: AddStockProps) => {
  const { updateIngrediente, getIngredientes } = useIngredientes();
  const { handleSubmit, control } = useForm<Ingrediente>();
  const { isXs, h3, h2 } = useResolution();
  const [alert, setAlert] = useState<string | undefined>();

  const onSubmit = (data: Ingrediente) => {
    let quantity = Number(ingrediente.quantity) + Number(data.quantity);

    const newData = {
      id: ingrediente.id,
      name: ingrediente.name,
      quantity: quantity,
      minQuantity: ingrediente.minQuantity,
      currency: data.currency ? data.currency : ingrediente.currency,
      cost: data.cost ? data.cost : ingrediente.cost,
    };
    updateIngrediente(newData, {
      success: () => {
        handleClose();
        getIngredientes({
          error: (msg) =>
            msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
        });
      },
    });
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
        justifyContent="space-between"
        alignItems="center"
        direction="column"
        ismobile={String(isXs)}
      >
        <Grid item>
          <StyledTitle variant={h2} color="textPrimary" ismobile={String(isXs)}>
            Agregar Stock de {ingrediente?.name}
          </StyledTitle>
        </Grid>
        <Grid item container justifyContent="center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant={h3}>
              Cantidad de {ingrediente?.name} que desea agregar
            </Typography>
            <Controller
              name="quantity"
              control={control}
              defaultValue={undefined}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <StyledField
                  label="Cantidad"
                  variant="filled"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="number"
                />
              )}
              rules={{ required: "Cantidad es requerido" }}
            />
            <Typography variant={h3}>¿Desea modificar el precio?</Typography>
            <Controller
              name="cost"
              control={control}
              defaultValue={undefined}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <StyledField
                  label="Precio"
                  fullWidth
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="number"
                />
              )}
              rules={{ required: "Precio es requerido" }}
            />
            <Controller
              name="currency"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <StyledField
                  select
                  fullWidth
                  label="Moneda"
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </StyledField>
              )}
              rules={{ required: "Moneda es requerido" }}
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
      </MainContainerGrid>
    </>
  );
};

export default AddStock;
