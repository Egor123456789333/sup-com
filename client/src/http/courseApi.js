import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createCourse = async (type) => {
  const { data } = await $authHost.post("api/course");
  return data;
};

export const fetchCourse = async () => {
  const { data } = await $host.get("api/course");

  return data;
};
