import { ReactNode } from "react";
import { Modal, useTheme } from "@material-ui/core";
import { useResolution } from "hooks/useResolution";
import { CustomBox } from "./PopupStyles";

type PopupProps = {
  handleClose?: (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => void;

  open: boolean;
  children: ReactNode;
};

export const Popup = ({ open, handleClose, children }: PopupProps) => {
  const { isXs } = useResolution();
  const theme = useTheme();
  return (
    <Modal open={open} onClose={handleClose}>
      <CustomBox
        backcolor={theme.palette.background.paper}
        ismobile={String(isXs)}
      >
        {children}
      </CustomBox>
    </Modal>
  );
};
