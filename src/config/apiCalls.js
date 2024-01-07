import axios from "axios";
import { appConfig } from ".";
const createHeader = () => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return {
    headers: {
      authorization: `Bearer ${userInfo.token}`,
    },
  };
};
export const getUsers = async (param) => {
  try {
    let headers = createHeader();

    let { data } = await axios.get(
      appConfig.user + `?search=${param}`,
      headers
    );
    return data;
  } catch (error) {
    console.log("eror in searchingnusers", error);
    return error;
  }
};

export const accessChat = async (userId) => {
  try {
    let headers = createHeader();

    let { data } = await axios.post(appConfig.chats, { userId }, headers);
    return data;
  } catch (error) {
    console.log("eror in searchingnusers", error);
    return error;
  }
};

export const getChats = async () => {
  try {
    let headers = createHeader();

    let { data } = await axios.get(appConfig.chats, headers);
    return data;
  } catch (error) {
    console.log("eror in searchingnusers", error);
    return error;
  }
};


export const createGroupChat = async ({name,userId}) => {
  try {
    let headers = createHeader();

    let { data } = await axios.post(appConfig.chats + "/group", { users:userId, name }, headers);
    return data;
  } catch (error) {
    console.log("eror in searchingnusers", error);
    return undefined
  }
};

export const updateChatName = async ({name,userId}) => {
  try {
    let headers = createHeader();

    let { data } = await axios.put(appConfig.group + `/${userId}`, {name }, headers);
    return data;
  } catch (error) {
    console.log("eror in searchingnusers", error);
    return undefined
  }
};

export const removeUser = async ({chatId, userId}) => {
  try {
    let headers = createHeader();

    let { data } = await axios.put(appConfig.group + `/${chatId}/remove`, { userId }, headers);
    return data;
  } catch (error) {
    console.log("eror in searchingnusers", error);
    return undefined
  }
};

export const addUser = async ({chatId, userId}) => {
  try {
    let headers = createHeader();

    let { data } = await axios.put(appConfig.group + `/${chatId}/add`, { userId }, headers);
    return data;
  } catch (error) {
    console.log("eror in searchingnusers", error);
    return undefined
  }
};

export const sendMessage = async ({chatId, content}) => {
  try {
    let headers = createHeader();
    let { data } = await axios.post(appConfig.message + `/${chatId}`, { content }, headers);
    return data;
  } catch (error) {
    console.log("eror in searchingnusers", error);
    return undefined
  }
};

export const allChatMessages = async ({chatId}) => {
  try {
    let headers = createHeader();
    let { data } = await axios.get(appConfig.message + `/${chatId}`, headers);
    return data;
  } catch (error) {
    console.log("eror in searchingnusers", error);
    return undefined
  }
};


// module.exports = { getUsers };
