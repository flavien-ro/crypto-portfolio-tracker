import React, { useEffect, useState } from "react";
import PorfolioHeader from "./PorfolioHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Tokens from "./Tokens/Tokens";
import Nfts from "./NFTs/Nfts";
import History from "./History/History";

import { useSelector } from "react-redux";

function Porfolio() {
  const [value, setValue] = useState("tokens");
  const address = useSelector((state) => state.address);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{ minHeight: "90vh", backgroundColor: "#091929", padding: "35px" }}
    >
      <Typography
        variant="h1"
        style={{ color: "white", fontWeight: "bold", marginBottom: "20px" }}
      >
        Porfolio
      </Typography>
      {address && address.address && (
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#06203A",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <PorfolioHeader />
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs"
          >
            <Tab
              style={{ fontSize: "20px", color: "white", fontWeight: "bold" }}
              value="tokens"
              label="Tokens"
              wrapped
            />
            <Tab
              style={{ fontSize: "20px", color: "white", fontWeight: "bold" }}
              value="nfts"
              label="NFTs"
            />
            <Tab
              style={{ fontSize: "20px", color: "white", fontWeight: "bold" }}
              value="history"
              label="History"
            />
          </Tabs>
          {value === "tokens" ? (
            <Tokens />
          ) : value === "nfts" ? (
            <Nfts />
          ) : (
            <History />
          )}
        </Box>
      )}
    </div>
  );
}

export default Porfolio;
