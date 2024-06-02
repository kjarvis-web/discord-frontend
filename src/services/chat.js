import axios from 'axios';
import config from '../utils/config';

const baseUrl = `${config.baseUrl}/chat`;
const messageUrl = `${config.baseUrl}/message`;
const groupUrl = `${config.baseUrl}/group`;
let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log(token);
};

const getChat = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}`, config);
  return response.data;
};

const addChat = async (newChat) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newChat, config);
  return response.data;
};

const addMessage = async (id, message) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/${id}`, message, config);
  return response.data;
};

const editMessage = async (updatedMessage) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${messageUrl}/${updatedMessage.id}`, updatedMessage, config);
  return response.data;
};

const notify = async (updatedChat) => {
  const response = await axios.put(`${baseUrl}/${updatedChat.id}/notify`, updatedChat);
  return response.data;
};

const hideChat = async (updatedChat) => {
  const response = await axios.put(`${baseUrl}/${updatedChat.id}/hide`, updatedChat);
  return response.data;
};

const addGroupChat = async (newChat) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(groupUrl, newChat, config);
  return response.data;
};

export default {
  getChat,
  addChat,
  setToken,
  addMessage,
  editMessage,
  notify,
  hideChat,
  addGroupChat,
};
