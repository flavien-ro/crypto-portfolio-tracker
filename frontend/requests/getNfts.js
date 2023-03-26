import axios from "axios";

export const getNfts = async (address) => {
  const url = "http://localhost:3001/getNfts?address=" + address;

  const response = await axios.get(url);

  return response.data;
};
