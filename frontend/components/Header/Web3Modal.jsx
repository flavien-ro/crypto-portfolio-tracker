import React from "react";
import Coinbase from "@/public/coinbase-icon.svg";
import WalletConnectIcon from "@/public/walletconnect-logo.svg";
import MetamaskIcon from "@/public/metamask-icon.svg";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Image from "next/image";

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "Web3-react Demo",
  supportedChainIds: [1, 3, 4, 5, 42],
});

const WalletConnect = new WalletConnectConnector({
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export default function Web3Modal(props) {
  const { handleClose, open, activate, account } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
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
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
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
            onClick={() => {
              activate(CoinbaseWallet);
            }}
            variant="outline"
          >
            <Image
              src={Coinbase}
              alt="Coinbase Icon"
              width={32}
              height={32}
              style={{ marginRight: "10px" }}
            />
            Coinbase Wallet
          </Button>
          <Button
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
            onClick={() => {
              activate(WalletConnect);
            }}
            variant="outline"
          >
            <Image
              src={WalletConnectIcon}
              alt="Coinbase Icon"
              width={45}
              height={45}
            />
            Connect Wallet
          </Button>
          <Button
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
            onClick={() => {
              activate(Injected);
            }}
            variant="outline"
          >
            <Image
              src={MetamaskIcon}
              alt="Coinbase Icon"
              width={25}
              height={25}
              style={{ marginRight: "10px" }}
            />
            Metamask
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
