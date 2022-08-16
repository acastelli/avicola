import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import { Table, TableCell } from "@material-ui/core";
import { ResolutionProps } from "utils/helpers";
import { Title } from "components/Layout/LayoutStyles";

export const StyledTitle = styled(Title)<ResolutionProps>(({ ismobile }) => ({
  marginBottom: ismobile ? "3rem" : 0,
  textAlign: "left",
}));

export const StyledCircularProgress = styled(CircularProgress)({
  position: "absolute",
  top: "50%",
});

export const StyledCell = styled(TableCell)({
  borderBottom: "none",
});

export const StyledTable = styled(Table)<ResolutionProps>(({ ismobile }) => ({
  width: ismobile ? "100%" : "50%",
}));

export const StyledDiv = styled.div({
  backgroundColor: "#fbf8ee40",
  textAlign: "center",
  padding: "2rem",
});
