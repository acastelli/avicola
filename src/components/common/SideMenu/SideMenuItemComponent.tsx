import { forwardRef, useState } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";

export interface SideMenuItemComponentProps {
  className?: string;
  link?: string | null; // because the InferProps props allows null value
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleDrawerClick?: () => void;
  index: number | undefined | null;
}

const SideMenuItemComponent: React.FC<SideMenuItemComponentProps> = (props) => {
  const { className, onClick, link, children, index, handleDrawerClick } =
    props;

  const [selectedIndex, setSelectedIndex] = useState<number | undefined | null>(
    1
  );

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number | undefined | null
  ) => {
    link && handleDrawerClick && handleDrawerClick();
    onClick(event);
    setSelectedIndex(index);
  };

  // If link is not set return the orinary ListItem
  if (!link || typeof link !== "string") {
    return (
      <ListItem
        button
        className={className}
        children={children}
        selected={selectedIndex === index}
        onClick={(event) => handleListItemClick(event, index)}
      />
    );
  }

  // Return a LitItem with a link component
  return (
    <ListItem
      button
      className={className}
      children={children}
      component={forwardRef((props: NavLinkProps, ref: any) => (
        <NavLink {...props} ref={ref} />
      ))}
      to={link}
      selected={selectedIndex === index}
      onClick={(event: any) => handleListItemClick(event, index)}
    />
  );
};

export default SideMenuItemComponent;
