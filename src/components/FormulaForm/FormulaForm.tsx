import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Grid, MenuItem, useTheme } from "@material-ui/core";
import { AddCircleOutline, Save } from "@material-ui/icons";
import { useIngredientes } from "hooks/useIngredientes";
import { Dispatchable } from "utils/helpers";

import {
  AddBtnGrid,
  AddButton,
  CustomButtons,
  DividerGrid,
  IngredienteGrid,
  RightBtnGrid,
  StyledDivider,
  StyledField,
  TextGrid,
} from "./FormulaFormStyles";
import { SelectedIngredientesTable } from "./SelectedIngredientesTable";

type FormulaFormProp = {
  nameForm?: string;
  onSubmit: (data: NewFormula) => void;
  handleClose: () => void;
  setAlert: (msg: string) => void;
  setSelectedIngredientes: Dispatchable<ShowIngrediente[] | undefined>;
  selectedIngredientes: ShowIngrediente[] | undefined;
  formulaName: string | undefined;
};

export type ShowIngrediente = {
  id: string;
  name: string;
  quantity: number;
};

export type NewFormula = {
  name: string;
  products: ShowIngrediente[] | undefined;
};

const FormulaForm = ({
  nameForm,
  onSubmit,
  handleClose,
  setAlert,
  setSelectedIngredientes,
  selectedIngredientes,
  formulaName,
}: FormulaFormProp) => {
  const { handleSubmit, control, getValues, resetField, reset } = useForm();
  const { data, getIngredientes } = useIngredientes();
  const theme = useTheme();

  const addIngredienteList = () => {
    let id = getValues("ingrediente");
    let qty = getValues("quantity");
    id &&
      qty &&
      setSelectedIngredientes(
        selectedIngredientes?.concat({
          id: id,
          name: data.find((i) => i.id === id)?.name || "",
          quantity: qty,
        })
      );
    resetField("quantity", { defaultValue: 0 });
    resetField("ingrediente");
  };

  useEffect(() => {
    reset({ name: nameForm, ingredientes: "", quantity: 0 });
    getIngredientes({
      error: (msg) =>
        msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getIngredientes, setAlert, reset]);

  return (
    <>
      <form
        onSubmit={handleSubmit((e) => {
          onSubmit({
            name: e.name,
            products: selectedIngredientes,
          });
        })}
      >
        <Grid item xs={12} container>
          <Grid item xs={5}>
            <Controller
              name="name"
              control={control}
              defaultValue={formulaName}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <StyledField
                  fullWidth
                  label="Nombre formula"
                  variant="filled"
                  value={value || formulaName}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="text"
                />
              )}
              rules={formulaName ? {} : { required: "Nombre es requerido" }}
            />
          </Grid>
          <TextGrid item xs={12}>
            <span>Selección de ingrediente:</span>
          </TextGrid>
          <Grid item container xs={12} alignItems="center">
            <IngredienteGrid item xs={5}>
              <Controller
                name="ingrediente"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <StyledField
                    select
                    fullWidth
                    defaultValue=""
                    label="Ingrediente"
                    variant="filled"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  >
                    {data
                      .filter(
                        (i) => !selectedIngredientes?.some((s) => s.id === i.id)
                      )
                      .map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </StyledField>
                )}
              />
            </IngredienteGrid>
            <Grid item xs={4}>
              <Controller
                name="quantity"
                control={control}
                render={({
                  field: { ref, value, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <StyledField
                    {...field}
                    inputRef={ref}
                    fullWidth
                    label="Cantidad"
                    variant="filled"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "Cantidad es requerido" }}
              />
            </Grid>
            <AddBtnGrid item xs={1}>
              <AddButton
                backcolor={theme.palette.primary.main}
                hovercolor={theme.palette.primary.dark}
                color="secondary"
                onClick={() => addIngredienteList()}
              >
                <AddCircleOutline />
              </AddButton>
            </AddBtnGrid>
          </Grid>
          <DividerGrid item xs={12}>
            <span>Ingredientes seleccionados</span>
            <StyledDivider backcolor={theme.palette.primary.main} />
          </DividerGrid>
          <Grid item xs={12}>
            <SelectedIngredientesTable
              selectedIngredientes={selectedIngredientes}
              setSelectedIngredientes={setSelectedIngredientes}
            />
          </Grid>
        </Grid>
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

export default FormulaForm;
