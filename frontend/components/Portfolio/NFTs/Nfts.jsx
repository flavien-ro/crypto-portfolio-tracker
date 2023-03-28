import React from "react";

import Typography from "@mui/material/Typography";
import { getNfts } from "@/requests/getNfts";
import RenderNFT from "./RenderNFT";
import Loader from "@/utils/Loader";
import { Grid } from "@mui/material";

import { useSelector } from "react-redux";

const Nfts = () => {
  const address = useSelector((state) => state.address.address);

  const { data, error, isLoading } = getNfts(address);

  return (
    <>
      <Typography
        variant="h3"
        style={{
          marginTop: "20px",
          marginBottom: "40px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Non-fungible token
      </Typography>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid container justifyContent={"flex-start"}>
          {data?.map((nft, index) => {
            const NftMetadataParse = JSON.parse(nft?.metadata);
            return (
              <Grid
                xs={12}
                sm={12}
                md={4}
                lg={2}
                style={{
                  border: "1px solid lightgray",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "20px",
                  borderRadius: "20px",
                  margin: "10px",
                }}
                key={index}
              >
                <RenderNFT NFTimage={NftMetadataParse?.image} name={nft.name} />
                <Typography
                  variant="body1"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginTop: "15px",
                  }}
                >
                  {nft.name}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default Nfts;
