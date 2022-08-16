import { ColorProp, ResolutionProps } from "utils/helpers";
import styled from "styled-components";
import { List, ListItemText } from "@material-ui/core";

export const StyledList = styled(List)<ColorProp & ResolutionProps>(
  ({ backcolor, ismobile }) => ({
    backgroundColor: ismobile ? backcolor : "none",
    height: ismobile ? "100%" : "inherit",
    paddingTop: ismobile ? "4rem" : 0,
    paddingLeft: ismobile ? 0 : "2rem",
  })
);

export const StyledListItemText = styled(ListItemText)<ColorProp>(
  ({ backcolor, hovercolor }) => ({
    fontWeight: 500,
    color: backcolor,
    fontSize: "2rem",
    "&$selected": {
      color: hovercolor,
    },
  })
);

export const StyledListItemTextChild = styled(ListItemText)<ColorProp>(
  ({ backcolor, hovercolor }) => ({
    fontWeight: 400,
    color: backcolor,
    fontSize: "1.5rem",
    "&$selected": {
      color: hovercolor,
    },
  })
);
