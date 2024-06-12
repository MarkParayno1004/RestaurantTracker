import * as React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  InputAdornment,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  TextField,
  Box,
  Modal,
} from "@mui/material";
import { getCategories } from "./utils/Categories";
import { CreateMenu } from "./utils/CRUD";
import { style } from "./utils/ModalBoxStyle";
import { SizeReducer } from "./utils/Reducers";

export default function ModalCreateMenu({ open, handleClose }) {
  const nameRef = React.useRef(null);
  const priceRef = React.useRef(0);
  const costRef = React.useRef(0);
  const stockRef = React.useRef(0);
  const [category, setCategory] = React.useState("");
  const [size, setSize] = React.useState("");
  const [sizeOptions, dispatchSize] = React.useReducer(SizeReducer, []);
  const categories = getCategories();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="spring-modal-title"
            variant="h4"
            mb={2}
            sx={{ color: "#00a5b0" }}
          >
            Menu
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="outlined-required"
                label="Food"
                inputRef={nameRef}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                <InputLabel id="demo-select-small-label">Category</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={category}
                  label="Category"
                  onChange={(e) => {
                    setCategory(e.target.value);
                    dispatchSize({ type: e.target.value });
                    setSize("");
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ minWidth: 1 }} size="small" fullWidth>
                <InputLabel id="demo-select-small-label">Size</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={size}
                  label="Size"
                  onChange={(e) => setSize(e.target.value)}
                >
                  {sizeOptions.map((option, index) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-required-1"
                label="Stock"
                type="number"
                size="small"
                fullWidth
                inputRef={stockRef}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-required-1"
                label="Price"
                type="number"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₱</InputAdornment>
                  ),
                }}
                inputRef={priceRef}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-required-2"
                label="Cost"
                type="number"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₱</InputAdornment>
                  ),
                }}
                inputRef={costRef}
              />
            </Grid>
          </Grid>

          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                CreateMenu({
                  category,
                  nameRef,
                  priceRef,
                  costRef,
                  stockRef,
                  size,
                  handleClose,
                });
              }}
              variant="contained"
              fullWidth
              style={{ backgroundColor: "#00a5b0", fontWeight: "bold" }}
            >
              Add Menu
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

ModalCreateMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.bool.isRequired,
};
