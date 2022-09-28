import { ReactNode } from "react";
import { Avatar, Grid, useTheme } from "@material-ui/core";
import HamburgerMenu from "components/common/HamburgerMenu/HamburgerMenu";
import SideMenu from "components/common/SideMenu/SideMenu";
import { useResolution } from "hooks/useResolution";
import Logo from "../../assets/logo.png";
import {
  CustomGrid,
  Root,
  StyledDiv,
  StyledHGrid,
  StyledMainDiv,
  StyledMainGrid,
} from "./LayoutStyles";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const { isXs } = useResolution();
  const theme = useTheme();
  return (
    <Root
      container
      alignContent="flex-start"
      backcolor={isXs ? theme.palette.secondary.main : theme.palette.text.black}
    >
      {!isXs ? (
        <>
          <CustomGrid container item md={2} alignContent="flex-start">
            <Grid item xs={12}>
              <StyledDiv>
                <Avatar src={Logo} />
              </StyledDiv>
            </Grid>
            <Grid item xs={12}>
              <SideMenu />
            </Grid>
          </CustomGrid>
          <CustomGrid item xs={10}>
            <StyledMainDiv>{children}</StyledMainDiv>
          </CustomGrid>
        </>
      ) : (
        <>
          <StyledHGrid item xs={2}>
            <HamburgerMenu />
          </StyledHGrid>
          <StyledMainGrid
            item
            container
            xs={12}
            md={10}
            ismobile={String(isXs)}
          >
            {children}
          </StyledMainGrid>
        </>
      )}
    </Root>
  );
};

export default Layout;
