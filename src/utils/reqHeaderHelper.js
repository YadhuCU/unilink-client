export function reqHeaderHelper(contentType) {
  const token = sessionStorage.getItem("token");

  console.log("token", token);

  if (token) {
    const reqHeader = {
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    };
    return reqHeader;
  }
  return null;
}
