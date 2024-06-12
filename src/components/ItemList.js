import React, { useState, useEffect } from "react";
import app from "../firebase-config";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import CreateItem from "./CreateItem";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import AuthEdit from "./dialogs/AuthEdit";
import AuthSaveEdit from "./dialogs/AuthSaveValueEdit";
import AuthDelete from "./dialogs/AuthDelete";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Button,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

function ItemList() {
  const [createMenu, setCreateMenu] = useState(false);
  const [getItems, setGetItems] = useState([]);
  const [page, setPage] = useState(1);
  const [openEditConfirmation, setOpenEditConfirmation] = useState(false);
  const [openConfirmationSave, setOpenConfirmationSave] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [authEdit, setAuthEdit] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editData, setEditData] = useState({});
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, "item/data");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setGetItems(
          Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }))
        );
      } else {
        setGetItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (item) => {
    setAuthEdit(true);
    setEditItemId(item.id);
    setEditData(item);
  };

  const handleSave = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `item/data/${editItemId}`);
    await update(dbRef, editData);
    setAuthEdit(false);
    setOpenConfirmationSave(false);
  };

  const handleDelete = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `item/data/${deleteItemId}`);
    await remove(dbRef);
    setOpenDelete(false);
    setDeleteItemId(null);
    window.location.reload();
  };

  const TableHeader = ["Food", "Category", "Size", "Stock", "Price", "Cost"];

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setCreateMenu(!createMenu)}
          style={{ backgroundColor: "#00a5b0" }}
        >
          Add Menu
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {TableHeader.map((title, index) => (
                <TableCell align="left" key={index}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                    color="#00a5b0"
                  >
                    {title}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getItems.slice(startIndex, endIndex).map((item, index) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {authEdit && editItemId === item.id ? (
                    <TextField
                      id="name"
                      label="Name"
                      variant="standard"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  ) : (
                    item.name
                  )}
                </TableCell>
                <TableCell align="left">
                  {authEdit && editItemId === item.id ? (
                    <TextField
                      id="category"
                      label="Category"
                      variant="standard"
                      value={editData.category}
                      onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                    />
                  ) : (
                    item.category
                  )}
                </TableCell>
                <TableCell align="left">
                  {authEdit && editItemId === item.id ? (
                    <TextField
                      id="size"
                      label="Size"
                      variant="standard"
                      value={editData.size}
                      onChange={(e) =>
                        setEditData({ ...editData, size: e.target.value })
                      }
                    />
                  ) : (
                    item.size
                  )}
                </TableCell>
                <TableCell align="left">
                  {authEdit && editItemId === item.id ? (
                    <TextField
                      id="stock"
                      label="Stock"
                      variant="standard"
                      value={editData.stock}
                      onChange={(e) =>
                        setEditData({ ...editData, stock: e.target.value })
                      }
                    />
                  ) : (
                    item.stock
                  )}
                </TableCell>
                <TableCell align="left">
                  {authEdit && editItemId === item.id ? (
                    <TextField
                      id="price"
                      label="Price"
                      type="number"
                      size="small"
                      variant="standard"
                      fullWidth
                      value={editData.price}
                      onChange={(e) =>
                        setEditData({ ...editData, price: e.target.value })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₱</InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    item.price
                  )}
                </TableCell>
                <TableCell align="left">
                  {authEdit && editItemId === item.id ? (
                    <TextField
                      id="cost"
                      label="Cost"
                      type="number"
                      size="small"
                      variant="standard"
                      fullWidth
                      value={editData.cost}
                      onChange={(e) =>
                        setEditData({ ...editData, cost: e.target.value })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₱</InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    item.cost
                  )}
                </TableCell>

                <TableCell align="left" sx={{ borderTop: "1px solid #E0E0E0" }}>
                  {authEdit && editItemId === item.id ? (
                    <IconButton
                      color="primary"
                      aria-label="save edit"
                      onClick={() => setOpenConfirmationSave(true)}
                      sx={{
                        color: "#00a5b0",
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="edit menu"
                      onClick={() => {
                        setOpenEditConfirmation(true);
                        setCurrentItem(item);
                      }}
                      sx={{
                        color: "#00a5b0",
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="left" sx={{ borderTop: "1px solid #E0E0E0" }}>
                  <IconButton
                    color="primary"
                    aria-label="delete menu"
                    onClick={() => {
                      setOpenDelete(true);
                      setDeleteItemId(item.id);
                    }}
                    sx={{
                      color: "#00a5b0",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        mt={2}
        sx={{
          bottom: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          p: 2,
        }}
      >
        <Pagination
          count={Math.ceil(getItems.length / itemsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{
            mb: 2,
            "& .Mui-selected": {
              color: "#00a5b0",
              backgroundColor: "rgba(0, 165, 176, 0.08)",
            },
            "& .MuiPaginationItem-page": {
              "&:hover": {
                backgroundColor: "rgba(0, 165, 176, 0.04)",
              },
            },
          }}
        />
      </Box>
      {createMenu && (
        <CreateItem
          open={createMenu}
          handleClose={() => setCreateMenu(!createMenu)}
        />
      )}
      {openEditConfirmation && (
        <AuthEdit
          handleOpen={openEditConfirmation}
          handleClose={() => setOpenEditConfirmation(false)}
          updateDataConfirmed={(data) => {
            if (data) {
              handleEdit(currentItem);
            }
          }}
          item={currentItem}
        />
      )}
      {openConfirmationSave && (
        <AuthSaveEdit
          handleOpen={openConfirmationSave}
          handleClose={() => setOpenConfirmationSave(false)}
          updateDataConfirmed={(data) => {
            if (data) {
              handleSave();
            }
          }}
        />
      )}
      {openDelete && (
        <AuthDelete
          handleOpen={openDelete}
          handleClose={() => setOpenDelete(!openDelete)}
          updateDataConfirmed={handleDelete}
        />
      )}
    </Box>
  );
}

export default ItemList;
