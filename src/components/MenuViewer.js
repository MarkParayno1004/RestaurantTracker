import React, { useEffect, useReducer } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialogs from "./Dialogs";
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
import { UpdateTableMenu } from "./utils/CRUD";
import { ItemListReducer, InitState } from "./utils/Reducers";

export default function MenuViewer() {
  const TableHeader = ["Food", "Category", "Size", "Stock", "Price", "Cost"];
  const [state, dispatch] = useReducer(ItemListReducer, InitState);
  const {
    createMenu,
    getItems,
    page,
    openEditConfirmation,
    openConfirmationSave,
    openDelete,
    authEdit,
    editItemId,
    editData,
    deleteItemId,
    currentItem,
  } = state;

  useEffect(() => {
    UpdateTableMenu({ dispatch });
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() =>
            dispatch({ type: "SET_CREATE_MENU", payload: !createMenu })
          }
          style={{ backgroundColor: "#00a5b0", fontWeight: "bold" }}
        >
          Add Menu
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {TableHeader.map((title, index) => (
                <TableCell align="left" key={title}>
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
            {getItems.slice((page - 1) * 10, page * 10).map((item, index) => (
              <TableRow key={item.id}>
                {[
                  { id: "name", label: "Name", value: item.name },
                  { id: "category", label: "Category", value: item.category },
                  { id: "size", label: "Size", value: item.size },
                  { id: "stock", label: "Stock", value: item.stock },
                  {
                    id: "price",
                    label: "Price",
                    value: item.price,
                    type: "number",
                  },
                  {
                    id: "cost",
                    label: "Cost",
                    value: item.cost,
                    type: "number",
                  },
                ].map((field) => (
                  <TableCell align="left" key={field.id}>
                    {authEdit && editItemId === item.id ? (
                      <TextField
                        id={field.id}
                        label={field.label}
                        type={field.type || "text"}
                        size="small"
                        variant="standard"
                        fullWidth
                        value={editData[field.id]}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_EDIT_DATA",
                            payload: {
                              ...editData,
                              [field.id]: e.target.value,
                            },
                          })
                        }
                        InputProps={
                          field.type === "number"
                            ? {
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₱
                                  </InputAdornment>
                                ),
                              }
                            : null
                        }
                      />
                    ) : (
                      field.value
                    )}
                  </TableCell>
                ))}
                <TableCell align="left" sx={{ borderTop: "1px solid #E0E0E0" }}>
                  {authEdit && editItemId === item.id ? (
                    <IconButton
                      color="primary"
                      aria-label="save edit"
                      onClick={() =>
                        dispatch({
                          type: "SET_OPEN_CONFIRMATION_SAVE",
                          payload: true,
                        })
                      }
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
                        dispatch({
                          type: "SET_OPEN_EDIT_CONFIRMATION",
                          payload: true,
                        });
                        dispatch({ type: "SET_CURRENT_ITEM", payload: item });
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
                      dispatch({ type: "SET_OPEN_DELETE", payload: true });
                      dispatch({
                        type: "SET_DELETE_ITEM_ID",
                        payload: item.id,
                      });
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
          count={Math.ceil(getItems.length / 10)}
          page={page}
          onChange={(event, value) =>
            dispatch({ type: "SET_PAGE", payload: value })
          }
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
      <Dialogs
        createMenu={createMenu}
        openEditConfirmation={openEditConfirmation}
        openConfirmationSave={openConfirmationSave}
        openDelete={openDelete}
        dispatch={dispatch}
        editItemId={editItemId}
        editData={editData}
        currentItem={currentItem}
        deleteItemId={deleteItemId}
      />
    </Box>
  );
}
