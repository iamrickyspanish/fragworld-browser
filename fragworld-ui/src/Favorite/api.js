import axios from "Shared/axios";

export const getFavorites = async (params = {}) => {
  const res = await axios.get("/favorites", {
    params
  });
  return res?.data;
};

export const createFavorite = async (data = {}) => {
  const res = await axios.post("/favorites", data);
  return res?.data;
};

export const deleteFavorite = async (id) => {
  const res = await axios.delete("/favorites/" + id);
  return res?.data;
};
