import styled from "styled-components";
import { Divider, Grid, TableCell, TextField } from "@material-ui/core";
import { Title, MainContainerGrid } from "components/Layout/LayoutStyles";
import { ColorProp, ResolutionProps } from "utils/helpers";

export const StyledGrid = styled(Grid)({
  height: "100%",
});

export const StyledGridLeft = styled(MainContainerGrid)({
  textAlign: "start",
});

export const StyledDivider = styled(Divider)<ColorProp>(({ backcolor }) => ({
  border: "2px solid " + backcolor,
  marginTop: "0.5rem",
}));

export const StyledTableCell = styled(TableCell)({
  border: 0,
});

export const StyledSpan = styled.span({
  fontWeight: "600",
});

export const StyledTextField = styled(TextField)<ResolutionProps>(
  ({ ismobile }) => ({
    width: ismobile ? "100%" : "40%",
    float: "right",
  })
);

export const AlertGrid = styled(Grid)<ResolutionProps>(({ ismobile }) => ({
  marginTop: ismobile ? "0" : "-3rem",
}));

export const StyledTitle = styled(Title)<ResolutionProps>(({ ismobile }) => ({
  textAlign: ismobile ? "center" : "left",
}));
