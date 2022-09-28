import styled from "styled-components";
import { Divider, Grid, TableCell, TextField } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Title, MainContainerGrid } from "components/Layout/LayoutStyles";
import { ColorProp, ResolutionProps } from "utils/helpers";

export const StyledGrid = styled(MainContainerGrid)({
  textAlign: "start",
  height: "100%",
});

export const StyledDivider = styled(Divider)<ColorProp>(({ backcolor }) => ({
  border: "2px solid " + backcolor,
  marginTop: "0.5rem",
  width: "100%",
}));

export const StyledTableCell = styled(TableCell)({
  border: 0,
});

export const StyledSpan = styled.span({
  fontWeight: "600",
  padding: "1.6rem",
});

export const StyledTextField = styled(TextField)<ResolutionProps>(
  ({ ismobile }) => ({
    width: ismobile === "true" ? "100%" : "40%",
    float: "right",
  })
);

export const AlertGrid = styled(Grid)<ResolutionProps>(({ ismobile }) => ({
  marginTop: ismobile === "true" ? "0" : "-3rem",
}));

export const StyledTitle = styled(Title)<ResolutionProps>(({ ismobile }) => ({
  textAlign: "center",
  paddingBottom: "2rem",
}));

export const StyledFilterIcon = styled(FilterListIcon)({
  alignSelf: "center",
  margin: "0 1.6rem",
});
