import styled from "styled-components";
import { ResolutionProps } from "utils/helpers";
import { Title } from "components/Layout/LayoutStyles";

export const StyledTitle = styled(Title)<ResolutionProps>(({ ismobile }) => ({
  marginBottom: ismobile === "true" ? "3rem" : 0,
}));
