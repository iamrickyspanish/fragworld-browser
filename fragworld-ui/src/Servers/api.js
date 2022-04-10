import axios from "Shared/axios";

export const getServers = async (params) => {
  const res = await axios.get("/servers", {
    params
  });
  return res?.data;
};
