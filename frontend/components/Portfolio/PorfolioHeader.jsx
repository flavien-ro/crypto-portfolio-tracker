import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";

import { numberWithSpaces, isNegative, removeNeg } from "@/utils/utils";
import { chainsConstant } from "@/utils/constants";

import useSwr from "swr";
import { fetcher } from "@/requests/fetcher";
import Loader from "@/utils/Loader";
import { getWalletBalance } from "@/requests/getWalletInfo";

import { useSelector } from "react-redux";

function PorfolioHeader() {
  const address = useSelector((state) => state.address.address);

  const { data, error, isLoading } = getWalletBalance(address);

  const chainsValue = chainsConstant(data);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ margin: "20px 0" }}>
          <Typography
            variant="h2"
            style={{ color: "white", fontWeight: "bold" }}
          >
            ${numberWithSpaces(data?.attributes?.total?.positions.toFixed(2))}
          </Typography>
          <Typography
            variant="body1"
            style={{
              color: isNegative(data?.attributes?.changes?.percent_1d)
                ? "red"
                : "green",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {!isNegative(data?.attributes?.changes?.percent_1d) && "+"}
            {numberWithSpaces(data?.attributes?.changes.percent_1d?.toFixed(2))}
            % ($
            {removeNeg(
              numberWithSpaces(
                data?.attributes?.changes?.absolute_1d?.toFixed(2)
              )
            )}
            )
          </Typography>
          <Grid container style={{ margin: "25px 0" }}>
            {chainsValue.map((chain, key) => {
              if (Number(chain.value) === 0) return;
              return (
                <Grid
                  key={key}
                  item
                  md={2}
                  style={{
                    margin: "15px 5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px 18px",
                    backgroundColor: "#021930",
                    border: "1px solid rgb(255, 255, 255, .5)",
                    borderRadius: "20px",
                  }}
                >
                  <Image src={chain.icon} alt="" width={30} height={30} />
                  <Typography
                    variant="body1"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                  >
                    ${numberWithSpaces(chain.value)}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </>
  );
}

export default PorfolioHeader;
