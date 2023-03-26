import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import { getWalletTransactions } from "@/requests/getWalletInfo";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import NoIcon from "@/public/no-icon.png";

import Image from "next/image";

import { transactionChainsConstant } from "@/utils/constants";
import {
  formatAMPM,
  numberWithSpaces,
  truncateEthAddress,
} from "@/utils/utils";
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
            <TableBody>
              {data?.slice(0, transacNb)?.map((transaction, key) => {
                return (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={{ display: "flex", alignItems: "flex-end" }}
                      align="left"
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="body1"
                          style={{
                            fontWeight: "bold",
                            color: "white",
                            marginRight: "10px",
                            textTransform: "capitalize",
                          }}
                        >
                          {transaction.attributes.operation_type}
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{
                            color: "lightgray",
                            marginRight: "10px",
                          }}
                        >
                          {formatAMPM(
                            new Date(transaction.attributes.mined_at)
                          )}
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={transactionChainsConstant(
                            transaction.relationships.chain.data.id
                          )}
                          alt="chain icon"
                          width={20}
                          height={20}
                        />
                        <Typography
                          variant="body2"
                          style={{
                            color: "white",
                            textTransform: "capitalize",
                            marginLeft: "5px",
                          }}
                        >
                          {transaction.relationships.chain.data.id ===
                          "binance-smart-chain"
                            ? "BSC"
                            : transaction.relationships.chain.data.id}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {transaction?.attributes?.transfers?.length > 0 ? (
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "row-reverse",
                              justifyContent: "flex-end",
                            }}
                          >
                            {transaction.attributes.transfers.map(
                              (transfer, key) => {
                                return (
                                  <div key={key}>
                                    {transfer.nft_info ? (
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
                                            src={
                                              transfer.nft_info.content.preview
                                                .url
                                            }
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
                                        {key !== 0 &&
                                          transaction?.attributes?.transfers
                                            ?.length > 0 && (
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
                                    ) : (
                                      <div>
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Image
                                            src={
                                              transfer?.fungible_info?.icon
                                                ?.url || NoIcon
                                            }
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
                                            {transfer.direction === "out"
                                              ? "-"
                                              : "+"}
                                            {numberWithSpaces(
                                              transfer.quantity.float.toFixed(3)
                                            )}
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
                                          {key !== 0 &&
                                            transaction?.attributes?.transfers
                                              ?.length > 0 && (
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
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Image
                            src={transactionChainsConstant(
                              transaction.relationships.chain.data.id
                            )}
                            alt="chain icon"
                            width={25}
                            height={25}
                          />
                          <Typography
                            variant="body1"
                            style={{
                              color: "white",
                              textTransform: "capitalize",
                              marginLeft: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {transaction.relationships.chain.data.id ===
                            "binance-smart-chain"
                              ? "BSC"
                              : transaction.relationships.chain.data.id}
                          </Typography>
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="body2" style={{ color: "white" }}>
                          To
                        </Typography>
                        <Typography variant="body2" style={{ color: "white" }}>
                          {truncateEthAddress(transaction.attributes.sent_to)}
                        </Typography>
                      </div>
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
