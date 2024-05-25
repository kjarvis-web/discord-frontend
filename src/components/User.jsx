import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setRecipient } from '../reducers/userReducer';

const User = () => {
  const users = useSelector((state) => state.users.allUsers);
  const id = useParams().id;
  const user = users.find((u) => u.id === id);
  const loginUser = useSelector((state) => state.login.user);
  const findFriend = user.friends.find((u) => u.id === loginUser.id);
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chat);
  const navigate = useNavigate();

  const handleMessage = (e) => {
    e.preventDefault();

    dispatch(setRecipient(id));
    const findChat = chats.find((chat) => chat.user1 === id || chat.user2 === id);
    console.log(findChat);
    if (findChat) {
      navigate(`/chats/${findChat.id}`);
    } else {
      navigate('/chats/new');
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-xl">{user.username}</h1>
      {findFriend ? <button>remove friend</button> : <button>send friend request</button>}
      <button onClick={handleMessage}>Send Message</button>
    </div>
  );
};

export default User;
