import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function AuthEdit({
  handleOpen,
  handleClose,
  updateDataConfirmed,
  item,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={handleOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Update this item"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to edit this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button
          onClick={() => {
            updateDataConfirmed(item);
            handleClose();
          }}
          sx={{ color: "#00a5b0" }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}
