import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteFriend, sendFriendRequest, setRecipient } from '../reducers/userReducer';
import Homepage from './Homepage';
import { Link } from 'react-router-dom';

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
      navigate(`/chat/${findChat.id}`);
    } else {
      navigate('/chat/new');
    }
  };

  const handleFriendRequest = (e, id) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${loginUser.token}` },
    };

    dispatch(sendFriendRequest(id, {}, config));
  };

  const handleRemove = (id) => {
    const config = {
      headers: { Authorization: `Bearer ${loginUser.token}` },
    };
    dispatch(deleteFriend(id, {}, config));
  };

  if (users.length === 0) return <div>loading...</div>;

  if (id === loginUser.id) return <Homepage />;

  const user = users.find((u) => u.id === id);
  const findFriend = user.friends.find((u) => u.id === loginUser.id);
  const findFriendRequest = user.friendRequests.find((u) => u.from === loginUser.id);
  const loggedUser = users.find((u) => u.id === loginUser.id);
  console.log(loggedUser);
  const loggedUserRequests = loggedUser.friendRequests.find(
    (fr) => fr.from === id && fr.status === 'pending'
  );

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center gap-2">
        <h1 className="font-semibold text-3xl">{user.username}</h1>
        <button
          onClick={handleMessage}
          className="bg-green-500 hover:bg-green-600 rounded px-2 font-semibold"
        >
          Send Message
        </button>
        {findFriend ? (
          <button
            onClick={() => handleRemove(id)}
            className="bg-red-500 hover:bg-red-600 rounded px-2 font-semibold"
          >
            Remove Friend
          </button>
        ) : findFriendRequest ? (
          <p>Your request has been sent.</p>
        ) : loggedUserRequests ? (
          <div>
            <Link to="/">
              <p>go to Homepage</p>
            </Link>
          </div>
        ) : (
          <button
            onClick={(e) => handleFriendRequest(e, id)}
            className="bg-blue-500 hover:bg-blue-600 rounded px-2 font-semibold"
          >
            Add as friend
          </button>
        )}
      </div>
    </div>
  );
};

export default User;
