import Arbitrum from "@/public/arbitrum.png";
import Aurora from "@/public/aurora.png";
import Avalanche from "@/public/avalanche.png";
import BSC from "@/public/bsc.png";
import Ethereum from "@/public/ethereum.png";
import Fantom from "@/public/fantom.png";
import Optimism from "@/public/optimism.png";
import Polygon from "@/public/polygon.png";
import Solana from "@/public/solana.png";
import XDai from "@/public/xdai.png";

export const chainsConstant = (data) => {
  return [
    {
      icon: Arbitrum,
      value:
        data?.attributes?.positions_distribution_by_chain?.arbitrum.toFixed(2),
    },
    {
      icon: Aurora,
      value:
        data?.attributes?.positions_distribution_by_chain?.aurora.toFixed(2),
    },
    {
      icon: Avalanche,
      value:
        data?.attributes?.positions_distribution_by_chain?.avalanche.toFixed(2),
    },
    {
      icon: BSC,
      value:
        data?.attributes?.positions_distribution_by_chain[
          "binance-smart-chain"
        ].toFixed(2),
    },
    {
      icon: Ethereum,
      value:
        data?.attributes?.positions_distribution_by_chain?.ethereum.toFixed(2),
    },
    {
      icon: Fantom,
      value:
        data?.attributes?.positions_distribution_by_chain?.fantom.toFixed(2),
    },
    {
      icon: Optimism,
      value:
        data?.attributes?.positions_distribution_by_chain?.optimism.toFixed(2),
    },
    {
      icon: Polygon,
      value:
        data?.attributes?.positions_distribution_by_chain?.polygon.toFixed(2),
    },
    {
      icon: Solana,
      value:
        data?.attributes?.positions_distribution_by_chain?.solana.toFixed(2),
    },
    {
      icon: XDai,
      value: data?.attributes?.positions_distribution_by_chain?.xdai.toFixed(2),
    },
  ];
};

export const transactionChainsConstant = (name) => {
  switch (name) {
    case "arbitrum":
      return Arbitrum;
    case "ethereum":
      return Ethereum;
    case "binance-smart-chain":
      return BSC;
    case "aurora":
      return Aurora;
    case "avalanche":
      return Avalanche;
    case "xdai":
      return XDai;
    case "polygon":
      return Polygon;
    case "solana":
      return Solana;
    case "fantom":
      return Fantom;
    case "optimism":
      return Optimism;
    default:
      return Arbitrum;
  }
};
