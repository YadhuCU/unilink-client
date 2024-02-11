import { SERVER_URL } from "./serverURL";
import { commonAPI } from "./commonAPI";

// login
export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/login`, "", reqBody);
};

// register.
export const registerAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/register`, "", reqBody);
};

// create-post.
export const createPostAPI = async (reqHeader, reqBody) => {
  return await commonAPI(
    "POST",
    `${SERVER_URL}/post/create`,
    reqHeader,
    reqBody,
  );
};

// get all posts.
export const getAllPostAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/posts/all`, reqHeader, "");
};

// get user.
export const getUserAPI = async (id, reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/user/${id}`, reqHeader, "");
};

// get Post
export const getPostAPI = async (id, reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/posts/${id}`, reqHeader, "");
};

// toggle Bookmark
export const toggleBookmarkAPI = async (reqHeader, reqBody) => {
  return await commonAPI(
    "PATCH",
    `${SERVER_URL}/user/bookmark/toggle`,
    reqHeader,
    reqBody,
  );
};

// update profile.
export const updateProfileAPI = async (id, reqHeader, reqBody) => {
  return await commonAPI(
    "PUT",
    `${SERVER_URL}/users/profile/update/${id}`,
    reqHeader,
    reqBody,
  );
};
