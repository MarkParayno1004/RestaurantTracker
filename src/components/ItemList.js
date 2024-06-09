import React, { useState, useEffect } from "react";
import app from "../firebase-config";
import { getDatabase, ref, onValue } from "firebase/database";
import CreateItem from "./CreateItem";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Pagination,
  Button,
  Box,
  Typography,
} from "@mui/material";

function ItemList() {
  const [getItems, setGetItems] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [openModal, setOpenModal] = React.useState(false);

  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, "item/data");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setGetItems(Object.values(snapshot.val()));
      } else {
        setGetItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const TableHeader = ["Food", "Category", "Size", "Stock", "Price", "Cost"];
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" onClick={() => setOpenModal(!openModal)}>
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
                    color="primary"
                  >
                    {title}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getItems.slice(startIndex, endIndex).map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="left">{item.category}</TableCell>
                <TableCell align="left">{item.size}</TableCell>
                <TableCell align="left">{item.stock}</TableCell>
                <TableCell align="left">{item.price}</TableCell>
                <TableCell align="left">{item.cost}</TableCell>

                <TableCell align="left" sx={{ borderTop: "1px solid #E0E0E0" }}>
                  <Button>Edit</Button>
                </TableCell>
                <TableCell align="left" sx={{ borderTop: "1px solid #E0E0E0" }}>
                  <Button>Delete</Button>
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
          color="primary"
          sx={{ mb: 2 }}
        />
      </Box>
      {openModal && (
        <CreateItem
          open={openModal}
          handleClose={() => setOpenModal(!openModal)}
        />
      )}
    </Box>
  );
}

export default ItemList;
