import type { ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/legacy/image";
import styled from "@emotion/styled";
import { TokenInfoProps } from "@/types/TokenProps";

const myLoader = ({ src }) => {
  return process.env.NODE_ENV === "development" && typeof window === "undefined"
    ? src.replace(/localhost/, "firebase")
    : src;
};

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default function Token({ name, image }: TokenInfoProps): ReactElement {
  return (
    <StyledBox>
      {image && (
        <Image
          loader={myLoader}
          src={image}
          alt={`${name} image`}
          width="100"
          height="100"
        />
      )}
      <Typography sx={{ mx: 1 }}>{name}</Typography>
    </StyledBox>
  );
}
