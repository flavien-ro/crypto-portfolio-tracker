import React from "react";
import { Typography } from "@mui/material";

import StakedTokens from "./StakedTokens";
import WalletTokens from "./WalletTokens";

import Loader from "@/utils/Loader";

import { getWalletBalance } from "@/requests/getWalletInfo";
import { useSelector } from "react-redux";

const Tokens = () => {
  const address = useSelector((state) => state.address.address);

  const { data, error, isLoading } = getWalletBalance(address);

  return (
    <>
      <Typography
        variant="h3"
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Assets
      </Typography>

      {isLoading ? (
        <Loader />
      ) : (
        <WalletTokens
          walletBalance={data}
          walletIsLoading={isLoading}
          type={"wallet"}
        />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <StakedTokens
          walletBalance={data}
          walletIsLoading={isLoading}
          type={"staked"}
        />
      )}
    </>
  );
};

export default Tokens;
