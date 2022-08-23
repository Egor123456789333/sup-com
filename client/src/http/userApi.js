import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, name, surname) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role: "USER",
    name,
    surname,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth", {});
  console.log(jwt_decode(data.token));
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const changeName = async (email, name) => {
  const { data } = await $authHost.put("api/user/name", { email, name });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const changeSurname = async (email, surname) => {
  const { data } = await $authHost.put("api/user/surname", { email, surname });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
