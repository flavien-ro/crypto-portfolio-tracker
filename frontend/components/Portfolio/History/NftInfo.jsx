import React from "react";
import Typography from "@mui/material/Typography";

import Image from "next/image";

const NftInfo = ({ transfer, index, transaction }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          src={transfer.nft_info.content.preview.url}
          alt="nft preview"
          width={30}
          height={30}
          style={{
            objectFit: "cover",
            marginRight: "5px",
          }}
        />
        <Typography
          variant="body2"
          style={{
            fontWeight: "bold",
            color: "white",
            textTransform: "capitalize",
            marginLeft: "5px",
          }}
        >
          {transfer.nft_info.name}
        </Typography>
      </div>
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

export default NftInfo;
