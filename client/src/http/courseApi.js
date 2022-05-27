import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createCourse = async (course) => {
  const { data } = await $authHost.post("api/course", course);
  return data;
};

export const fetchCourse = async () => {
  const { data } = await $host.get("api/course");

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

export const deleteCourse = async (id) => {
  const { data } = await $authHost.delete(`api/course/${id}`);

  return data;
};
