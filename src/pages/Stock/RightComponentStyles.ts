import styled from "styled-components";
import { Card, CardActions, Grid, Link, Typography } from "@material-ui/core";
import { ColorProp, ResolutionProps } from "utils/helpers";

export const MainGrid = styled(Grid)<ColorProp & ResolutionProps>(
  ({ backcolor, ismobile }) => ({
    borderRadius: ismobile ? "0.4rem" : "0 1rem 1rem 0",
    height: "inherit",
    backgroundColor: backcolor,
    marginTop: ismobile ? "1rem" : 0,
    marginBottom: ismobile ? "2rem" : 0,
  })
);

export const StyledCard = styled(Card)<ColorProp>(({ backcolor }) => ({
  marginTop: "4rem",
  backgroundColor: backcolor,
  opacity: 0.68,
  border: 0,
  borderRadius: "1rem",
}));

export const StyledCardAction = styled(CardActions)({
  justifyContent: "flex-end",
});

export const CardTitle = styled(Typography)({
  marginBottom: "2rem",
});

export const CardDescription = styled(Typography)({
  fontWeight: "500",
});

export const StyledLink = styled(Link)<ResolutionProps>(({ ismobile }) => ({
  fontSize: "1.2rem",
  textDecoration: "underline",
  float: ismobile ? "right" : "inherit",
  marginRight: ismobile ? "2rem" : 0,
  "&:hover": {
    cursor: "pointer",
  },
}));

export const DivDolarContainer = styled.div<ResolutionProps>(
  ({ ismobile }) => ({
    display: "inline-flex",
    margin: ismobile ? "0.5rem" : "2rem 0 0 0",
  })
);

export const DivDolar = styled.div({
  marginRight: "1rem",
});
