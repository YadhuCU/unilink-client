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

// get random user.
export const getRandomUserAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/users/random`, reqHeader, "");
};

// get all user
export const getAllUserAPI = async (searchInput, reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/users/all?search=${searchInput}`,
    reqHeader,
    "",
  );
};

// get bookmarked posts.
export const getBookmarkPostsAPI = async (id, reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/users/bookmark/${id}`,
    reqHeader,
    "",
  );
};

// folllow - unfollow user.
export const followUnfollowUserAPI = async (id, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${SERVER_URL}/users/follow-unfollow/${id}`,
    reqHeader,
    {},
  );
};

// get following users post.
export const getFollowingUsersPostsAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/posts/following/post`,
    reqHeader,
    "",
  );
};

// add comment to post.
export const addCommentToPostAPI = async (postId, reqHeader, reqBody) => {
  return await commonAPI(
    "POST",
    `${SERVER_URL}/posts/comment/${postId}`,
    reqHeader,
    reqBody,
  );
};

// get following users post.
export const getUserPostsAPI = async (userId, reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/posts/user/${userId}`,
    reqHeader,
    "",
  );
};

// get following users post.
export const getUserRepliedPostsAPI = async (userId, reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/posts/user/replied/${userId}`,
    reqHeader,
    "",
  );
};

// toggle Bookmark
export const likeOrUnlikePostAPI = async (postId, reqHeader) => {
  return await commonAPI(
    "PATCH",
    `${SERVER_URL}/posts/like/${postId}`,
    reqHeader,
    "",
  );
};

// get following users post.
export const getUserLikedPostsAPI = async (userId, reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/posts/user/liked/${userId}`,
    reqHeader,
    "",
  );
};

// send Message.
export const sendMessageAPI = async (reqHeader, reqBody) => {
  return await commonAPI(
    "POST",
    `${SERVER_URL}/message/add`,
    reqHeader,
    reqBody,
  );
};

// get all conversations.
export const getAllConversationsAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/message/conversations/all`,
    reqHeader,
    "",
  );
};

// get message.
export const getMessageAPI = async (otherUserId, reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/message/users/${otherUserId}`,
    reqHeader,
    "",
  );
};
