"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@/components/Link";

export default function User() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          User property management
        </Typography>
        <Box maxWidth="sm">
          <Link href="/about" color="secondary">
            Go to the home page
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
