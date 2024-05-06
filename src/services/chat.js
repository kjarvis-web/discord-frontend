import axios from 'axios';
import config from '../utils/config';

const baseUrl = `${config.baseUrl}/chat`;
let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log(token);
};

const getChat = async () => {
  const config = {
    headers: { Authorization: token },
  };
  console.log('token', token);
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const addChat = async (newChat) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newChat, config);
  return response.data;
};

export default { getChat, addChat, setToken };
