"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useShareTokenDialog } from "@/hooks/useShareTokenDialog";
import TokenInfoDialog from "@/components/dialogs/TokenInfoDialog";
import * as TokenService from "@/services/TokenService";
import { TokenInfoProps } from "@/types/TokenProps";
import Token from "@/components/Token";

export default function HomePage() {
  const { setDialog } = useShareTokenDialog();
  const [tokens, setTokens] = useState<TokenInfoProps[]>([]);
  useEffect(() => {
    let cancelled = false;
    (async function doWork(): Promise<void> {
      // async work here
      if (cancelled) {
        return;
      }
      const data = await TokenService.getTokens();
      setTokens(data);
    })();

    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          Token List
        </Typography>
        <Button
          variant="contained"
          onClick={() => setDialog({ open: true, isCreate: true })}
        >
          Add Token
        </Button>
      </Box>
      <Box display="flex" sx={{ mx: "auto", width: "90%" }}>
        {tokens.map((token) => (
          <Token key={token.id} {...token} />
        ))}
      </Box>
      <TokenInfoDialog />
    </Container>
  );
}
