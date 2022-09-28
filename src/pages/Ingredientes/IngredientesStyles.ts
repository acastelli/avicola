import styled from "styled-components";
import { Button, Grid, IconButton } from "@material-ui/core";
import { ColorProp, ResolutionProps } from "utils/helpers";

export const StyledIconButton = styled(IconButton)<ColorProp>(
  ({ backcolor }) => ({
    backgroundColor: backcolor,
    borderRadius: 0,
  })
);

export const StyledGrid = styled(Grid)<ResolutionProps>(({ ismobile }) => ({
  marginTop: ismobile === "true" ? "2rem" : 0,
}));

export const StyledButton = styled(Button)({
  marginBottom: "3rem",
});
