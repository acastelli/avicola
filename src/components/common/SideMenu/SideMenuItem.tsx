import React from "react";
import PropTypes from "prop-types";
import { List, Divider, Collapse, useTheme } from "@material-ui/core";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import SideMenuItemComponent from "./SideMenuItemComponent";
import { StyledListItemText, StyledListItemTextChild } from "./SideMenuStyles";

export const MenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  key: PropTypes.number,
  items: PropTypes.array,
};

type SideMenuItemPropTypes = PropTypes.InferProps<typeof MenuItemPropTypes>;
type SideMenuItemPropsWithoutItems = Omit<SideMenuItemPropTypes, "items">;

export type SideMenuItemProps = SideMenuItemPropsWithoutItems & {
  items?: SideMenuItemProps[];
  index?: number;
  isChild?: boolean;
  handleDrawerClick?: () => void;
};

const SideMenuItem: React.FC<SideMenuItemProps> = (props) => {
  const { name, link, items = [], isChild, index, handleDrawerClick } = props;
  const theme = useTheme();

  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  const MenuItemRoot = (
    <SideMenuItemComponent
      link={link}
      onClick={handleClick}
      handleDrawerClick={handleDrawerClick}
      index={index}
    >
      {isChild ? (
        <StyledListItemTextChild
          primary={name}
          disableTypography={true}
          inset={false}
          backcolor={theme.palette.primary.main}
          hovercolor={theme.palette.borderColor.main}
        />
      ) : (
        <StyledListItemText
          primary={name}
          disableTypography={true}
          inset={false}
          backcolor={theme.palette.secondary.main}
          hovercolor={theme.palette.borderColor.main}
        />
      )}
      {/* Display the expand menu if the item has children */}
      {isExpandable && !open && (
        <IconExpandMore fontSize="large" color="secondary" />
      )}
      {isExpandable && open && (
        <IconExpandLess fontSize="large" color="secondary" />
      )}
    </SideMenuItemComponent>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <SideMenuItem
            {...item}
            key={index}
            isChild={true}
            handleDrawerClick={handleDrawerClick}
          />
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
};

export default SideMenuItem;
