import axios from "Shared/axios";

export const login = async (credentials) => {
  const res = await axios.post("/auth/login", {
    credentials
  });
  return res?.data;
};

export const logout = async () => {
  const res = await axios.get("/auth/logout");
  return res?.data;
};

export const join = async (data) => {
  const res = await axios.post("/auth/join", data);
  return res?.data;
};
