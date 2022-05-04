import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createTest = async () => {
  const { data } = await $authHost.post("api/test");
  return data;
};

export const fetchTest = async () => {
  const { data } = await $host.get("api/test");

  return data;
};

export const fetchOneTest = async (id) => {
  const { data } = await $host.get("api/test/" + id);

  return data;
};

export const sendAnswer = async (answer) => {
  const { data } = await $authHost.post("api/test/complete", { answer });

  return data;
};
