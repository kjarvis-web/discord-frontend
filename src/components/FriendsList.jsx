import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getLoggedUser, setRecipient } from '../reducers/userReducer';
import { Link } from 'react-router-dom';
import { getChat } from '../reducers/chatReducer';

const FriendsList = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login.user);
  const user = useSelector((state) => state.users.loggedUser);
  const { chats } = useSelector((state) => state.chat);
  useEffect(() => {
    if (loginUser) {
      dispatch(getLoggedUser(loginUser.id));
    }
    dispatch(getChat());
  }, [dispatch, loginUser]);

  const handleFriend = (user) => {
    dispatch(setRecipient(user));
  };

  if (!user || !chats) return <div>loading...</div>;

  return (
    <div>
      <h1 className="font-bold text-xl">Friends</h1>
      <div className="flex flex-col">
        {user.friends.map((friend) => {
          const findChat = chats.find(
            (chat) => chat.user1 === friend.id || chat.user2 === friend.id
          );
          return (
            <Link key={friend.id} to={`/chats/${findChat.id}`}>
              <button onClick={() => handleFriend(friend.id)}>{friend.username}</button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsList;
