import axios from "axios";

export const fetcher = async (url) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    return { error };
  }
};
