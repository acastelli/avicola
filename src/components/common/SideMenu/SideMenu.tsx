import { useTheme } from "@material-ui/core";
import { useResolution } from "hooks/useResolution";
import { ROUTES } from "utils/constants";

import SideMenuItem from "./SideMenuItem";
import { StyledList } from "./SideMenuStyles";

const sideMenuItems = [
  {
    name: "Stock",
    link: ROUTES.HOME,
  },
  {
    name: "Ingredientes",
    items: [
      {
        name: "Ver ingredientes",
        link: ROUTES.INGREDIENTES,
      },
      {
        name: "Agregar ingrediente",
        link: ROUTES.ADD_INGREDIENTE,
      },
    ],
  },
  {
    name: "Formulas",
    link: ROUTES.FORMULAS,
  },
  {
    name: "Reportes",
    items: [
      {
        name: "Canchadas",
        link: ROUTES.CANCHADAS,
      },
      {
        name: "Stock de Ingredientes",
        link: ROUTES.INGREDIENTS_STOCK,
      },
    ],
  },
];

type SideMenuProps = {
  handleDrawerClick?: () => void;
};

const SideMenu = ({ handleDrawerClick }: SideMenuProps) => {
  const theme = useTheme();
  const { isXs } = useResolution();
  return (
    <StyledList
      disablePadding
      backcolor={theme.palette.text.black}
      ismobile={String(isXs)}
    >
      {sideMenuItems.map((item, index) => (
        <SideMenuItem
          {...item}
          key={index}
          index={index}
          handleDrawerClick={handleDrawerClick}
        />
      ))}
    </StyledList>
  );
};

export default SideMenu;
