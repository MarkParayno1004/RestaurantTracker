import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

export default function AuthSaveEdit({
  handleOpen,
  handleClose,
  updateDataConfirmed,
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
      <DialogTitle id="responsive-dialog-title">{"Update Menu"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Would you like to save these changes?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button
          onClick={() => {
            updateDataConfirmed(true);
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

AuthSaveEdit.propTypes = {
  handleOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.bool.isRequired,
  updateDataConfirmed: PropTypes.func.isRequired,
};
