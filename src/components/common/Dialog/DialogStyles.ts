import styled from "styled-components";
import { Button } from "@material-ui/core";
import { ColorProp } from "utils/helpers";

export const CancelButton = styled(Button)<ColorProp>(
  ({ backcolor, hovercolor }) => ({
    backgroundColor: backcolor,
    "&:hover": {
      backgroundColor: hovercolor,
    },
  })
);
