import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createTheory = async (theory) => {
  const { data } = await $authHost.post("api/theory", theory);
  return data;
};

// export const createTheoryOpenMP = async (theory) => {
//   const { data } = await $authHost.post("api/theory/openMP", theory);
//   return data;
// };

export const fetchTheory = async () => {
  const { data } = await $host.get("api/theory");

  return data;
};

export const fetchChapter = async (id) => {
  const { data } = await $host.get("api/theory/" + id);

  return data;
};

// export const fetchOpenMPTheory = async () => {
//   const { data } = await $host.get("api/theory/openMP");

//   return data;
// };

export const updateTheory = async (theory) => {
  const { data } = await $authHost.put("api/theory/", theory);
  return data;
};

// export const updateOpenMP = async (theory) => {
//   const { data } = await $authHost.put("api/openMP/", theory);
//   return data;
// };

export const deleteTheory = async (id) => {
  const { data } = await $authHost.delete(`api/theory/${id}`);

  return data;
};

// export const deleteOpenMP = async (id) => {
//   const { data } = await $authHost.delete(`api/openMP/${id}`);

//   return data;
// };
