import styled from "styled-components";
import { Container, Grid, Typography } from "@material-ui/core";
import { ColorProp, ResolutionProps } from "../../utils/helpers";

export const Root = styled(Grid)<ColorProp>(({ backcolor }) => ({
  backgroundColor: backcolor,
  minHeight: "100vh",
}));

export const CustomGrid = styled(Grid)({
  minHeight: "inherit",
});

export const StyledDiv = styled.div({
  backgroundColor: "black",
  margin: "5rem",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const StyledMainGrid = styled(Grid)<ResolutionProps>(({ ismobile }) => ({
  backgroundColor: "white",
  height: "calc(100% - 5rem)",
  borderRadius: ismobile ? "0.5rem" : "2rem",
  margin: ismobile ? 0 : "2rem",
  padding: ismobile ? "0.5rem" : 0,
}));

export const StyledMainDiv = styled.div({
  backgroundColor: "white",
  height: "calc(100% - 4rem)",
  borderRadius: "2rem",
  margin: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const Title = styled(Typography)<ResolutionProps>(({ ismobile }) => ({
  textAlign: "left",
  paddingBottom: ismobile ? 0 : "4rem",
  paddingTop: ismobile ? 0 : "1rem",
}));

export const MainContainerGrid = styled(Grid)<ResolutionProps>(
  ({ ismobile }) => ({
    padding: ismobile ? "1rem 0.5rem" : "3rem 1rem",
    maxWidth: "128rem",
  })
);

export const StyledTableContainer = styled(Container)({
  paddingLeft: 0,
  paddingRight: 0,
});

export const StyledHGrid = styled(Grid)({
  textAlign: "left",
});
