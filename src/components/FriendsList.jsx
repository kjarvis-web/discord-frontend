import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getLoggedUser } from '../reducers/userReducer';
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

  // const handleFriend = (user) => {
  //   dispatch(setRecipient(user));
  // };

  if (!loginUser) return <div>Log In</div>;

  if (!user || !chats) return <div>loading...</div>;

  return (
    <div>
      <h1 className="font-bold text-2xl">Friends</h1>
      <div className="flex flex-col">
        {user.friends.map((friend) => {
          return (
            <Link key={friend.id} to={`/user/${friend.id}`}>
              <button>{friend.username}</button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsList;
