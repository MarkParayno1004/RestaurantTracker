import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import app from "../firebase-config";
import { getDatabase, ref, set, push } from "firebase/database";
import { Grid, InputAdornment } from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function CreateItem({ open, handleClose }) {
  const nameRef = React.useRef(null);
  const priceRef = React.useRef(0);
  const costRef = React.useRef(0);
  const stockRef = React.useRef(0);
  const [category, setCategory] = React.useState("");
  const [size, setSize] = React.useState("");
  const [sizeOptions, dispatchSize] = React.useReducer(reducer, []);

  function reducer(state, action) {
    switch (action.type) {
      case "Appetizers":
        return ["Small", "Medium", "Large"];
      case "Soups":
        return ["Cup", "Bowl"];
      case "Salads":
        return ["Side", "Regular", "Large"];
      case "Main Course":
        return ["Regular", "Large"];
      case "Sides":
        return ["Small", "Medium", "Large"];
      case "Desserts":
        return ["Single", "Double"];
      case "Beverage":
        return ["Small", "Medium", "Large"];
      default:
        return [];
    }
  }

  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "item/data"));
    set(newDocRef, {
      category: category,
      name: nameRef.current.value,
      price: priceRef.current.value,
      cost: costRef.current.value,
      stock: stockRef.current.value,
      size: size,
    })
      .then(() => {
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Here is a gentle confirmation that your action was successful.
        </Alert>;
        nameRef.current.value = "";
        priceRef.current.value = "";
        costRef.current.value = "";
        stockRef.current.value = "";
        handleClose();
      })
      .catch((error) => alert("Error:", error));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const categories = [
    { value: "Appetizers", label: "Appetizers" },
    { value: "Soups", label: "Soups" },
    { value: "Salads", label: "Salads" },
    { value: "Main Course", label: "Main Course" },
    { value: "Sides", label: "Sides" },
    { value: "Desserts", label: "Desserts" },
    { value: "Beverage", label: "Beverage" },
  ];

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="spring-modal-title" variant="h4" mb={2}>
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
                    <MenuItem key={index} value={option}>
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
              onClick={saveData}
              variant="contained"
              color="primary"
              fullWidth
            >
              Add Menu
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
