import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3Modal from "./Web3Modal";

import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import RGSlogo from "@/public/rgslogo.svg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { truncateEthAddress } from "@/utils/utils";

export default function Header(props) {
  const { page } = props;
  const [open, setOpen] = useState(false);

  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React();
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleClose();
  }, [active]);

  return (
    <header
      style={{
        background: "#091929",
        width: "100%",
        height: "10vh",
        padding: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "8px",
            borderRadius: "25px",
          }}
        >
          <Image src={RGSlogo} alt="RGS logo" />
        </div>
        <ul
          style={{
            width: "75%",
            display: "flex",
            justifyContent: "space-around",
            listStyle: "none",
          }}
        >
          <li>
            <Link
              style={{
                color: page ? "lightgray" : "white",
                fontWeight: "bold",
                fontSize: "18px",
                marginRight: "25px",
                textDecoration: "none",
              }}
              href="/"
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              style={{
                color: page === "bridge" ? "white" : "gray",
                fontWeight: "bold",
                fontSize: "18px",
                textDecoration: "none",
                marginRight: "25px",
              }}
              href="/swap"
            >
              Swap
            </Link>
          </li>
          <li>
            <Link
              style={{
                color: page === "bridge" ? "white" : "gray",
                fontWeight: "bold",
                fontSize: "18px",
                textDecoration: "none",
              }}
              href="/bridge"
            >
              Bridge
            </Link>
          </li>
        </ul>
      </nav>
      <div
        style={{
          width: "25%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {!active ? (
          <Button
            style={{
              padding: "20px",
              border: "none",
              backgroundColor: "#243056",
              color: "#5981F3",
              fontWeight: "bold",
              borderRadius: "30px",
              cursor: "pointer",
            }}
            onClick={() => setOpen(!open)}
          >
            Connect Wallet
          </Button>
        ) : (
          <Button
            style={{
              padding: "20px",
              border: "none",
              backgroundColor: "#243056",
              color: "#5981F3",
              fontWeight: "bold",
              borderRadius: "30px",
              cursor: "pointer",
            }}
            onClick={deactivate}
          >
            {truncateEthAddress(account)}
            <ExitToAppIcon style={{ marginLeft: "5px", opacity: ".8" }} />
          </Button>
        )}
      </div>
      <Web3Modal open={open} handleClose={handleClose} activate={activate} />
    </header>
  );
}
