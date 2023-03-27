import useSwr from "swr";

import { fetcher } from "./fetcher";

const sortNfts = (nfts) => {
  const res = [];

  if (nfts) {
    nfts?.map((nft) => {
      nft?.result.map((n) => {
        res.push(n);
      });
    });
  }
  return res;
};

export const getNfts = (address) => {
  const { data, error, isLoading } = useSwr(
    `${process.env.API_NODE_URL}getNfts?address=${address}`,
    fetcher
  );

  const response = sortNfts(data);

  return {
    data: response,
    error: error,
    isLoading: isLoading,
  };
};
