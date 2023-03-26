import React, { useState } from "react";

import Typography from "@mui/material/Typography";

import LockIcon from "@mui/icons-material/Lock";
import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

import { numberWithSpaces, isNegative, removeNeg } from "@/utils/utils";

import { getWalletPositions } from "@/requests/getWalletInfo";
import Loader from "@/utils/Loader";

const StakedTokens = ({ walletBalance, walletIsLoading }) => {
  const [nextStaked, setNextStaked] = useState(10);

  const { data, error, isLoading } = getWalletPositions(
    "0xeEcFF03e43c1666a56aCEAF96b52005A30fFa62A",
    "staked"
  );

  const handleMoreStaked = () => {
    setNextStaked(data?.length + 1);
  };

  const handleLessStaked = () => {
    setNextStaked(10);
  };

  return (
    <div
      style={{
        marginTop: "25px",
        padding: "25px",
        borderRadius: "12px",
        border: "1px solid rgb(255, 255, 255, .5)",
      }}
    >
      {walletIsLoading ? (
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
          <LockIcon style={{ marginRight: "10px" }} /> Staked -{" "}
          {numberWithSpaces(
            walletBalance?.attributes?.positions_distribution_by_type?.staked.toFixed(
              2
            )
          )}
        </Typography>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TableContainer>
            <Table
              sx={{ minWidth: 650, background: "#001F3D" }}
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
                      fontWeight: "bold",
                      fontSize: "16px",
                      textTransform: "uppercase",
                    }}
                    align="left"
                  >
                    Protocol
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
                {data?.slice(0, nextStaked)?.map((position, key) => {
                  return (
                    <TableRow
                      key={key}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
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
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          variant="body1"
                          style={{ color: "white", marginRight: "10px" }}
                        >
                          {position.attributes.name}
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
                          {numberWithSpaces(
                            position.attributes.value.toFixed(2)
                          )}{" "}
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
                          {!isNegative(
                            position.attributes.changes.percent_1d
                          ) && "+"}
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
          {data?.length > 10 && (
            <>
              {nextStaked < data?.length ? (
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
                    onClick={handleMoreStaked}
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
                    onClick={handleLessStaked}
                  >
                    Show less assets
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StakedTokens;
