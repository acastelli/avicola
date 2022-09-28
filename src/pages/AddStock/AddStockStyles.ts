import styled from "styled-components";
import { ResolutionProps } from "utils/helpers";
import { Button, TextField } from "@material-ui/core";
import { Title } from "components/Layout/LayoutStyles";

export const CustomButtons = styled(Button)({
  marginTop: "2rem",
  width: "100%",
});

export const StyledField = styled(TextField)({
  paddingBottom: "2rem",
});

export const StyledTitle = styled(Title)<ResolutionProps>(({ ismobile }) => ({
  marginBottom: ismobile === "true" ? "3rem" : 0,
}));
