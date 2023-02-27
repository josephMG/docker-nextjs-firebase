import { useState } from "react";
import { useBetween } from "use-between";
import { TokenInfoProps } from "@/types/TokenProps";

interface DialogProps {
  open: boolean;
  isCreate: boolean;
}

const useTokenDialog = () => {
  const [token, setToken] = useState<TokenInfoProps>({
    id: "",
    name: "",
    image: "",
    amount: 0,
    rate: 0,
  });
  const [dialog, setDialog] = useState<DialogProps>({
    open: false,
    isCreate: false,
  });
  return {
    token,
    setToken,
    dialog,
    setDialog,
  };
};

const useShareTokenDialog = () => useBetween(useTokenDialog);

export { useShareTokenDialog };
