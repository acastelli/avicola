import { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Drawer, IconButton, useTheme } from "@material-ui/core";
import { StyledDiv, StyledIconButton } from "./HamburgerMenuStyles";
import SideMenu from "../SideMenu/SideMenu";

const HamburgerMenu = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <StyledDiv backcolor={theme.palette.text.black}>
          <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
            <CloseIcon fontSize="large" color="secondary" />
          </IconButton>
        </StyledDiv>

        <SideMenu handleDrawerClick={() => setOpenDrawer(false)} />
      </Drawer>
      <StyledIconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon fontSize="large" color="primary" />
      </StyledIconButton>
    </>
  );
};

export default HamburgerMenu;
