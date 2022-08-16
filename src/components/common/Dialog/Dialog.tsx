import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  useTheme,
} from "@material-ui/core";
import { CancelButton } from "./DialogStyles";

type DialogAlertProps = {
  handleClose?: (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => void;
  handleConfirm?: (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => void;
  open: boolean;
  title: string;
  description: string;
};

export const DialogAlert = ({
  handleClose,
  handleConfirm,
  open,
  title,
  description,
}: DialogAlertProps) => {
  const theme = useTheme();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={theme.palette.text.black}>
          <Typography variant="h2"> {title}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            color="textPrimary"
            variant="h3"
          >
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} autoFocus>
            Aceptar
          </Button>
          <CancelButton
            backcolor={theme.palette.grey[500]}
            hovercolor={theme.palette.grey[700]}
            onClick={handleClose}
          >
            Cancelar
          </CancelButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
