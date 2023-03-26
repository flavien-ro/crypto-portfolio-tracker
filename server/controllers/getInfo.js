import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
import { ethers } from "ethers";
import fetch from "node-fetch";

export const getWalletPortfolio = async (req, res) => {
  try {
    const { address } = req.query;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: "Basic " + process.env.BASIC_ZERION,
      },
    };

    const response = await fetch(
      "https://api.zerion.io/v1/wallets/" + address + "/portfolio",
      options
    )
      .then((response) => response.json())
      // .then((response) => console.log(response))
      .catch((err) => console.error(err));

    const result = response.data;

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWalletPositions = async (req, res) => {
  try {
    const { address, type } = req.query;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: "Basic " + process.env.BASIC_ZERION,
      },
    };

    const response = await fetch(
      "https://api.zerion.io/v1/wallets/" +
        address +
        "/positions/?currency=usd&filter[position_types]=" +
        type +
        "&sort=value",
      options
    )
      .then((response) => response.json())
      // .then((response) => console.log(response))
      .catch((err) => console.error(err));

    const result = response.data;

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWalletTransactions = async (req, res) => {
  try {
    const { address, next } = req.query;
    let response = [];

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: "Basic " + process.env.BASIC_ZERION,
      },
    };

    if (next) {
      response = await fetch(next, options)
        .then((response) => response.json())
        .catch((err) => console.error(err));
    } else {
      response = await fetch(
        "https://api.zerion.io/v1/wallets/" +
          address +
          "/transactions/?currency=usd&page[size]=100",
        options
      )
        .then((response) => response.json())
        .catch((err) => console.error(err));
    }

    const result = response.data;

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNFTs = async (req, res) => {
  try {
    const allNFTs = [];

    const { address } = req.query;

    const chains = [
      EvmChain.ETHEREUM,
      EvmChain.BSC,
      EvmChain.POLYGON,
      EvmChain.ARBITRUM,
      EvmChain.AVALANCHE,
    ];

    for (const chain of chains) {
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
      });
      allNFTs.push(response);
    }

    res.status(200).json(allNFTs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
