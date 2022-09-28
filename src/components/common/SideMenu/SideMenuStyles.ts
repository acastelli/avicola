import { ColorProp, ResolutionProps } from "utils/helpers";
import styled from "styled-components";
import { List, ListItemText } from "@material-ui/core";

export const StyledList = styled(List)<ColorProp & ResolutionProps>(
  ({ backcolor, ismobile }) => ({
    backgroundColor: ismobile === "true" ? backcolor : "none",
    height: ismobile === "true" ? "100%" : "inherit",
    paddingTop: ismobile === "true" ? "4rem" : 0,
    paddingLeft: ismobile === "true" ? 0 : "2rem",
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
