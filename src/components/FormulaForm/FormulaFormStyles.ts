import styled from "styled-components";
import { Button, Divider, Grid, TextField } from "@material-ui/core";
import { ColorProp } from "utils/helpers";
import { StyledIconButton } from "pages/Ingredientes/IngredientesStyles";

export const CustomButtons = styled(Button)({
  marginTop: "2rem",
});

export const StyledField = styled(TextField)({
  paddingBottom: "2rem",
});

export const RightBtnGrid = styled(Grid)({
  marginLeft: "0.5rem",
});

export const IngredienteGrid = styled(Grid)({
  marginRight: "2rem",
});

export const StyledDivider = styled(Divider)<ColorProp>(({ backcolor }) => ({
  border: "1px solid " + backcolor,
  marginTop: "0.5rem",
}));

export const DividerGrid = styled(Grid)({
  textAlign: "left",
  marginTop: "4rem",
  marginBottom: "2rem",
});

export const TextGrid = styled(Grid)({
  textAlign: "left",
  marginBottom: "2rem",
  marginTop: "2rem",
});

export const AddButton = styled(StyledIconButton)<ColorProp>(
  ({ hovercolor }) => ({
    marginTop: "1rem",
    height: "50%",
    "&:hover": {
      backgroundColor: hovercolor,
    },
  })
);

export const AddBtnGrid = styled(Grid)({
  height: "100%",
});
