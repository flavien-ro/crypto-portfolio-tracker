import React, { useEffect, useState } from "react";
import Coinbase from "@/public/coinbase-icon.svg";
import WalletConnectIcon from "@/public/walletconnect-logo.svg";
import MetamaskIcon from "@/public/metamask-icon.svg";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Image from "next/image";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { truncateEthAddress } from "@/utils/utils";

import { useConnect, useAccount, useDisconnect } from "wagmi";

import { Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { addAddress } from "@/redux/addressReducer";

export default function Web3Modal() {
  const dispatch = useDispatch();

  const { address, isConnected } = useAccount();

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleClose();
    dispatch(addAddress(address));
  }, [isConnected]);

  if (isConnected) {
    return (
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
        onClick={() => {
          disconnect();
          localStorage.removeItem("address");
        }}
      >
        {truncateEthAddress(address)}
        <ExitToAppIcon style={{ marginLeft: "5px", opacity: ".8" }} />
      </Button>
    );
  }

  return (
    <>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 0 }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            background: "white",
            boxShadow: 24,
            borderRadius: "25px",
            p: 6,
          }}
        >
          <CloseIcon
            onClick={handleClose}
            style={{
              position: "absolute",
              color: "black",
              top: "15",
              right: "15",
              cursor: "pointer",
            }}
          />
          <div>
            {connectors.map((connector) => (
              <Button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
                style={{
                  border: "none",
                  width: "100%",
                  borderRadius: "25px",
                  border: "1px solid black",
                  marginBottom: "20px",
                  color: "black",
                  fontWeight: "bold",
                  height: "50px",
                }}
              >
                <Image
                  src={
                    connector.name[0] === "M"
                      ? MetamaskIcon
                      : connector.name[0] === "C"
                      ? Coinbase
                      : WalletConnectIcon
                  }
                  alt={connector.name}
                  width={28}
                  height={28}
                  style={{ marginRight: "10px" }}
                />
                {connector.name}
                {!connector.ready && " (unsupported)"}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  " (connecting)"}
              </Button>
            ))}

            {error && (
              <Typography variant="body2" style={{ color: "red" }}>
                {error.message}
              </Typography>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}
