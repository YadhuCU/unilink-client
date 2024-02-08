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