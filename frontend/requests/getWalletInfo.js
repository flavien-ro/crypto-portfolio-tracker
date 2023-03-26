import useSwr from "swr";
import { fetcher } from "./fetcher";

export const getWalletBalance = (address) => {
  const { data, error, isLoading } = useSwr(
    `${process.env.API_NODE_URL}getWalletPortfolio?address=${address}`,
    fetcher,
    {
      refreshInterval: 15,
    }
  );

  return {
    data: data?.result,
    error: error,
    isLoading: isLoading,
  };
};

export const getWalletPositions = (address, type) => {
  const url =
    "http://localhost:3001/getWalletPositions?address=" +
    address +
    "&type=" +
    type;

  const { data, error, isLoading } = useSwr(url, fetcher, {
    setInterval: 5,
  });

  return {
    data: data?.result,
    error: error,
    isLoading: isLoading,
  };
};

export const getWalletTransactions = (address, next) => {
  const url =
    "http://localhost:3001/getWalletTransactions?address=" +
    address +
    "&next=" +
    next;

  const { data, error, isLoading } = useSwr(url, fetcher);

  return {
    data: data?.result,
    error: error,
    isLoading: isLoading,
  };
};
