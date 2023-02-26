"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function HomePage() {
  return (
    <Container maxWidthhh="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          User property management
        </Typography>
        <Button variant="contained">Add user</Button>
      </Box>
    </Container>
  );
}
