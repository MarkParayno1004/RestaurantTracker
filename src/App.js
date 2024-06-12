import React from "react";
import CreateItem from "./components/CreateItem";
import ItemList from "./components/ItemList";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container>
      <Typography
        m={2}
        variant="h4"
        color="#00a5b0"
        sx={{ fontWeight: "bold" }}
      >
        Restaurant Tracker
      </Typography>
      <ItemList />
    </Container>
  );
}

export default App;
