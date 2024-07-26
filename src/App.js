import React from "react";
import MenuViewer from "./components/MenuViewer";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container maxWidth="md">
      <Typography
        m={2}
        variant="h4"
        color="#00a5b0"
        sx={{ fontWeight: "bold" }}
      >
        Menu Tracker
      </Typography>
      <MenuViewer />
    </Container>
  );
}

export default App;
