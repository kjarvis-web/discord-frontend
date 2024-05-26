import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers, sendFriendRequest, setRecipient } from '../reducers/userReducer';

const User = () => {
  const users = useSelector((state) => state.users.allUsers);
  const id = useParams().id;
  const loginUser = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chat);
  const navigate = useNavigate();

  const handleMessage = (e) => {
    e.preventDefault();
    dispatch(setRecipient(id));
    const findChat = chats.find((chat) => chat.user1 === id || chat.user2 === id);
    if (findChat) {
      navigate(`/chats/${findChat.id}`);
    } else {
      navigate('/chats/new');
    }
  };

  const handleFriendRequest = (e, id) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${loginUser.token}` },
    };

    dispatch(sendFriendRequest(id, {}, config));
  };

  if (users.length === 0) return <div>loading...</div>;

  const user = users.find((u) => u.id === id);
  const findFriend = user.friends.find((u) => u.id === loginUser.id);
  const findFriendRequest = user.friendRequests.find((u) => u.from === loginUser.id);

  console.log('all users', users);
  console.log('user', user);
  console.log('findFriend', findFriend);
  console.log('findFriendRequest', findFriendRequest);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4">
        <h1 className="font-semibold text-xl">{user.username}</h1>
        <button onClick={handleMessage}>Send Message</button>
      </div>

      {findFriend ? (
        <button>remove friend</button>
      ) : findFriendRequest ? (
        <p>your request has been sent</p>
      ) : (
        <button onClick={(e) => handleFriendRequest(e, id)}>send friend request</button>
      )}
    </div>
  );
};

export default User;
