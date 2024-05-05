import axios from 'axios';
import config from '../utils/config';
const baseUrl = `${config.baseUrl}/users`;

const getUsers = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const createUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

export default { getUsers, createUser };
