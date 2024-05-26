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

const sendFriendRequest = async (id, friendRequest, config) => {
  // const config = {
  //   headers: { Authorization: token },
  // };
  const response = await axios.post(`${baseUrl}/${id}/friend_request`, friendRequest, config);
  return response.data;
};

const acceptFriend = async (id) => {
  const response = axios.post(`${baseUrl}/${id}/accept_friend_request`);
  return response.data;
};

export default { getUsers, createUser, getLoggedUser, sendFriendRequest, acceptFriend };
