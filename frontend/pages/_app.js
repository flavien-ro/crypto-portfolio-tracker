import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import "../global.css";
import { Montserrat } from "next/font/google";

const montSerrat = Montserrat({ subsets: ["latin"] });

function getLibrary(provider) {
  return new Web3Provider(provider);
}

export default function App({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <style jsx global>{`
        html {
          font-family: ${montSerrat.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}
