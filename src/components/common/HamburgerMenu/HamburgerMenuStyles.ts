import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { ColorProp } from "utils/helpers";

export const StyledDiv = styled.div<ColorProp>(({ backcolor }) => ({
  backgroundColor: backcolor,
  textAlign: "right",
}));

export const StyledIconButton = styled(IconButton)({
  paddingBottom: 0,
  paddingTop: "1rem",
});
