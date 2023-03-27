import React from "react";
import Typography from "@mui/material/Typography";

import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Image from "next/image";

import NftInfo from "./NftInfo";
import FungibleInfo from "./FungibleInfo";

import { transactionChainsConstant } from "@/utils/constants";
import { formatAMPM, truncateEthAddress } from "@/utils/utils";

const MainTable = ({ data, transacNb }) => {
  return (
    <TableBody>
      {data?.slice(0, transacNb)?.map((transaction, key) => {
        return (
          <TableRow
            key={key}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="left">
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
                    marginBottom: "10px",
                  }}
                >
                  {formatAMPM(new Date(transaction.attributes.mined_at))}
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
                    {transaction.attributes.transfers.map((transfer, key) => {
                      return (
                        <div key={key}>
                          {transfer.nft_info ? (
                            <NftInfo
                              transfer={transfer}
                              index={key}
                              transaction={transaction}
                            />
                          ) : (
                            <FungibleInfo
                              transfer={transfer}
                              index={key}
                              transaction={transaction}
                            />
                          )}
                        </div>
                      );
                    })}
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
              <Typography
                variant="body2"
                style={{ color: "white", fontWeight: "bold" }}
              >
                From
              </Typography>
              <Typography variant="body2" style={{ color: "white" }}>
                {truncateEthAddress(transaction.attributes.sent_from)}
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "white", fontWeight: "bold" }}
              >
                To
              </Typography>
              <Typography variant="body2" style={{ color: "white" }}>
                {truncateEthAddress(transaction.attributes.sent_to)}
              </Typography>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default MainTable;
