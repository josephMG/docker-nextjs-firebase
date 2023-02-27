import * as React from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
} from "@mui/material";
// import { toast } from "react-toastify";
import { useShareTokenDialog } from "@/hooks/useShareTokenDialog";
import {
  TokenInfoProps,
  TokenInfoWithExperienceProps,
} from "@/types/TokenProps";
import * as TokenService from "@/services/TokenService";
import ImageUploader from "../ImageUploader";

export default function TokenInfoDialog() {
  const { token, setToken, dialog, setDialog } = useShareTokenDialog();
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setDialog({ open: false, isCreate: false });
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await TokenService.setToken(token);
      setDialog({ open: false, isCreate: false });
      setToken({} as TokenInfoProps);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setDialog({ open: false, isCreate: false });
      /*
      toast.info("Please check your network for consistency.", {
        containerId: "error-toast",
      });
       */
    }
  };

  const handleChange = (
    key: keyof TokenInfoProps,
    val: string | number | boolean
  ) => {
    setToken((u) => ({ ...(u || {}), [key]: val } as TokenInfoProps));
  };

  return (
    <Dialog open={dialog.open} onClose={handleClose}>
      <DialogTitle>{dialog.isCreate ? "Add Token" : "Edit Token"}</DialogTitle>
      <DialogContent>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Stack spacing={2}>
            <ImageUploader
              folder="token_logo"
              size={250}
              onChange={(filepath: string) => handleChange("image", filepath)}
              url={token?.image}
            />
          </Stack>
          <Stack spacing={2}>
            <FormControl variant="standard">
              <InputLabel htmlFor="token-name-input">Name</InputLabel>
              <Input
                id="token-name-input"
                value={token?.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="token-rate-input">rate</InputLabel>
              <Input
                id="token-rate-input"
                type="number"
                value={token?.rate}
                onChange={(e) =>
                  handleChange("rate", e.target.value as unknown as number)
                }
              />
            </FormControl>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          onClick={handleClose}
          data-testid="cancel-button"
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          color="primary"
          variant="contained"
          onClick={handleSave}
          data-testid="save-button"
        >
          {loading ? "Loading..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
