import axios from 'axios';
import config from '../utils/config';

const baseUrl = `${config.baseUrl}/chat`;
const messageUrl = `${config.baseUrl}/message`;
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

export default { getChat, addChat, setToken, addMessage, editMessage };
