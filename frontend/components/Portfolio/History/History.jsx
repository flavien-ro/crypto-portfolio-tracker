import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import { getWalletTransactions } from "@/requests/getWalletInfo";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

import Button from "@mui/material/Button";

import MainTable from "./MainTable";

import Loader from "@/utils/Loader";

const History = () => {
  const [next, setNext] = useState("");
  const [transacNb, setTransacNb] = useState(10);

  const { data, error, isLoading } = getWalletTransactions(
    "0xeEcFF03e43c1666a56aCEAF96b52005A30fFa62A",
    next
  );

  const handleMoreTokens = () => {
    setTransacNb(data?.length + 1);
  };

  const handleLessTokens = () => {
    setTransacNb(10);
  };

  return (
    <div>
      <Typography
        variant="h3"
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Transaction history
      </Typography>
      {isLoading ? (
        <Loader />
      ) : (
        <TableContainer>
          <Table
            sx={{
              minWidth: 650,
              background: "#001F3D",
              borderTop: "1px solid rgba(224, 224, 224, 1)",
            }}
            aria-label="simple table"
          >
            <MainTable data={data} transacNb={transacNb} />
          </Table>
        </TableContainer>
      )}
      {data?.length > 10 && (
        <>
          {transacNb < data?.length ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  color: "white",
                  backgroundColor: "transparent",
                  marginTop: "20px",
                  padding: "15px 35px",
                  fontWeight: "bold",
                }}
                variant="outlined"
                onClick={handleMoreTokens}
              >
                Show all transactions
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  color: "white",
                  backgroundColor: "transparent",
                  marginTop: "20px",
                  padding: "15px 35px",
                  fontWeight: "bold",
                }}
                variant="outlined"
                onClick={handleLessTokens}
              >
                Show less transactions
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default History;
