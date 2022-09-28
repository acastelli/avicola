import styled from "styled-components";
import { Box } from "@material-ui/core";
import { ColorProp, ResolutionProps } from "utils/helpers";

export const CustomBox = styled(Box)<ColorProp & ResolutionProps>(
  ({ backcolor, ismobile }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: backcolor,
    borderRadius: "1.2rem",
    paddingTop: "3.0rem",
    paddingBottom: "4.8rem",
    paddingLeft: "2.4rem",
    paddingRight: "2.9rem",
    width: ismobile === "true" ? "90%" : "40%",
  })
);
