import React from "react";

import Typography from "@mui/material/Typography";

import Image from "next/image";
import NoIcon from "@/public/no-icon.png";

import { numberWithSpaces } from "@/utils/utils";

const FungibleInfo = ({ transfer, index, transaction }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        src={transfer?.fungible_info?.icon?.url || NoIcon}
        alt="coin icon"
        width={20}
        height={20}
        style={{ marginRight: "5px" }}
      />
      <Typography
        variant="body1"
        style={{
          color: "white",
          fontWeight: "bold",
        }}
      >
        {transfer.direction === "out" ? "-" : "+"}
        {numberWithSpaces(transfer.quantity.float.toFixed(3))}
      </Typography>
      <Typography
        variant="body2"
        style={{
          color: "white",
          marginLeft: "5px",
        }}
      >
        {transfer.fungible_info.symbol}
      </Typography>
      {index !== 0 && transaction?.attributes?.transfers?.length > 0 && (
        <Typography
          variant="body1"
          style={{
            fontWeight: "bold",
            color: "white",
            margin: "0px 20px",
          }}
        >
          {">"}
        </Typography>
      )}
    </div>
  );
};

export default FungibleInfo;
