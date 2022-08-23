import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createBasketCourse = async (courseId, userId) => {
  const { data } = await $authHost.post("api/basket", { courseId, userId });
  return data;
};

export const fetchCourseBascet = async (id) => {
  console.log(id);
  const { data } = await $host.get("api/basket/" + id);

  return data;
};

export const updateCourse = async (course) => {
  const { data } = await $authHost.put("api/course", course);
  return data;
};

export const updateCourseWithoutImage = async (course) => {
  const { data } = await $authHost.put("api/course/withoutImage", course);
  return data;
};

export const deleteBascetCourse = async (id) => {
  const { data } = await $authHost.delete(`api/basket/${id}`);

  return data;
};
