import { Controller, useForm } from "react-hook-form";
import { Grid, MenuItem } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { Ingrediente } from "utils/ingrediente";
import {
  CustomButtons,
  RightBtnGrid,
  StyledField,
} from "./IngredienteFormStyles";

export const currencies = [
  {
    value: "USD",
    label: "USD",
  },
  {
    value: "PESOS_URUGUAYOS",
    label: "$",
  },
];

type IngrdienteFormProp = {
  onSubmit: (data: Ingrediente) => void;
  handleClose: () => void;
};

const IngrdienteForm = ({ onSubmit, handleClose }: IngrdienteFormProp) => {
  const { handleSubmit, control } = useForm<Ingrediente>();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledField
              label="Nombre"
              variant="filled"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{ required: "Nombre es requerido" }}
        />
        <Controller
          name="quantity"
          control={control}
          defaultValue={undefined}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledField
              label="Cantidad"
              variant="filled"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type="number"
            />
          )}
          rules={{ required: "Cantidad es requerido" }}
        />
        <Controller
          name="cost"
          control={control}
          defaultValue={undefined}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledField
              label="Precio"
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
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledField
              select
              fullWidth
              defaultValue=""
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
    </>
  );
};

export default IngrdienteForm;
