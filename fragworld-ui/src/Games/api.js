import axios from "Shared/axios";

export const getGames = async () => {
  const res = await axios.get("/games");
  return res?.data;
};
