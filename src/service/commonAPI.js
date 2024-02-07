import axios from "axios";

export async function commonAPI(method, url, reqHeader, reqBody) {
  try {
    return await axios({
      method,
      data: reqBody,
      headers: reqHeader || "Appliaction/json",
      url,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}
