import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

import NoIcon from "@/public/no-icon.png";

import { getWalletPositions } from "@/requests/getWalletInfo";

import { numberWithSpaces, isNegative, removeNeg } from "@/utils/utils";
import Loader from "@/utils/Loader";

import { useSelector } from "react-redux";

const WalletTokens = ({ walletBalance }) => {
  const [next, setNext] = useState(10);
  const address = useSelector((state) => state.address.address);

  const { data, error, isLoading } = getWalletPositions(address, "wallet");

  const handleMoreTokens = () => {
    setNext(data?.length + 1);
  };

  const handleLessTokens = () => {
    setNext(10);
  };

  return (
    <div
      style={{
        padding: "25px",
        borderRadius: "12px",
        border: "1px solid rgb(255, 255, 255, .5)",
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Typography
          variant="body1"
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          <AccountBalanceWalletIcon style={{ marginRight: "10px" }} /> Wallet -{" "}
          {numberWithSpaces(
            walletBalance?.attributes?.positions_distribution_by_type?.wallet.toFixed(
              2
            )
          )}
        </Typography>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <TableContainer>
          <Table
            sx={{
              minWidth: 650,
              background: "#06203A",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textTransform: "uppercase",
                  }}
                >
                  Asset
                </TableCell>
                <TableCell
                  style={{
                    color: "white",
                    fontSize: "16px",
                    textTransform: "uppercase",
                  }}
                  align="right"
                >
                  Price
                </TableCell>
                <TableCell
                  style={{
                    color: "white",
                    fontSize: "16px",
                    textTransform: "uppercase",
                  }}
                  align="right"
                >
                  Balance
                </TableCell>
                <TableCell
                  style={{
                    color: "white",
                    fontSize: "16px",
                    textTransform: "uppercase",
                  }}
                  align="right"
                >
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.slice(0, next)?.map((position, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Image
                          src={
                            position?.attributes?.fungible_info?.icon?.url ||
                            NoIcon
                          }
                          alt="coin icon"
                          width={30}
                          height={30}
                          style={{ marginRight: "10px" }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="body1"
                            style={{ color: "white", fontWeight: "bold" }}
                          >
                            {position.attributes.fungible_info.symbol}
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: "5px",
                            }}
                          >
                            {position.relationships.chain.data.id ===
                            "binance-smart-chain" ? (
                              <Image
                                src={"/bsc.png"}
                                alt="chain icon"
                                width={18}
                                height={18}
                              />
                            ) : (
                              <Image
                                src={
                                  "/" +
                                  position.relationships.chain.data.id +
                                  ".png"
                                }
                                alt="chain icon"
                                width={18}
                                height={18}
                              />
                            )}

                            <Typography
                              variant="body1"
                              style={{
                                marginLeft: "5px",
                                fontSize: "12px",
                                color: "gray",
                                fontWeight: "bold",
                                textTransform: "capitalize",
                              }}
                            >
                              {position.relationships.chain.data.id}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="body1" style={{ color: "white" }}>
                        $
                        {numberWithSpaces(position.attributes.price.toFixed(2))}{" "}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        style={{ color: "white", marginRight: "10px" }}
                      >
                        {numberWithSpaces(
                          position.attributes.quantity.float.toFixed(3)
                        )}{" "}
                        {position.attributes.fungible_info.symbol}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" style={{ color: "white" }}>
                        $
                        {numberWithSpaces(position.attributes.value.toFixed(2))}{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          color: isNegative(
                            position.attributes.changes.percent_1d
                          )
                            ? "red"
                            : "green",
                          fontWeight: "bold",
                        }}
                      >
                        {!isNegative(position.attributes.changes.percent_1d) &&
                          "+"}
                        {numberWithSpaces(
                          position.attributes.changes.percent_1d.toFixed(2)
                        )}
                        % ($
                        {removeNeg(
                          numberWithSpaces(
                            position.attributes.changes.absolute_1d.toFixed(2)
                          )
                        )}
                        )
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {data?.length > 10 && (
        <>
          {next < data?.length ? (
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
                Show all assets
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
                Show less assets
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WalletTokens;
