import styled from "styled-components";
import { Button, CircularProgress } from "@material-ui/core";
import { ColorProp } from "utils/helpers";

export const StyledButton = styled(Button)<ColorProp>(
  ({ backcolor, hovercolor }) => ({
    textAlign: "right",
    backgroundColor: backcolor,
    "&:hover": {
      backgroundColor: hovercolor,
    },
  })
);

export const StyledCircularProgress = styled(CircularProgress)({
  position: "absolute",
  top: "50%",
});
