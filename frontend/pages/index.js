import Head from "next/head";
import Header from "@/components/Header/Header";
import Porfolio from "@/components/Portfolio/Porfolio";
import { getNfts } from "@/requests/getNfts";
import { getWalletBalance, getWalletPositions } from "@/requests/getWalletInfo";

export default function Home() {
  return (
    <>
      <Head>
        <title>Portfolio Tracker</title>
        <meta name="description" content="Portfolio tracker using Moralis" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Porfolio />
    </>
  );
}
