import "../global.css";
import { Montserrat } from "next/font/google";

import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";

import { publicProvider } from "wagmi/providers/public";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.WALLET_CONNECT_ID,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const montSerrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <WagmiConfig client={client}>
        <style jsx global>{`
          html {
            font-family: ${montSerrat.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </WagmiConfig>
    </Provider>
  );
}
