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

const getLoggedUser = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  console.log(request.data);
  return request.data;
};

export default { getUsers, createUser, getLoggedUser };
