import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createTest = async (test) => {
  const { data } = await $authHost.post("api/test", { ...test });
  return data;
};

export const updateTest = async (test) => {
  const { data } = await $authHost.put("api/test", { ...test });
  return data;
};

export const fetchTest = async (userId) => {
  console.log(userId);
  const { data } = await $host.get(`api/test/all/${userId}`);

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

export const fetchResults = async (userId) => {
  const { data } = await $authHost.get("api/test/result", { userId });

  return data;
};

export const deleteTest = async (id) => {
  const { data } = await $authHost.delete(`api/test/${id}`);

  return data;
};

export const fetchOneTestWithAnswer = async (id) => {
  const { data } = await $host.get("api/test/withAnswer/" + id);

  return data;
};
