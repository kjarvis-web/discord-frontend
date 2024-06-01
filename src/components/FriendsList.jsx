import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getLoggedUser } from '../reducers/userReducer';
import { Link } from 'react-router-dom';
import { getChat } from '../reducers/chatReducer';

const FriendsList = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login.user);

  const { chats } = useSelector((state) => state.chat);
  const users = useSelector((state) => state.users.allUsers);

  useEffect(() => {
    if (loginUser) {
      dispatch(getLoggedUser(loginUser.id));
    }
    dispatch(getChat());
  }, [dispatch, loginUser]);

  if (!loginUser) return <div>Log In</div>;
  const user = users.find((u) => u.id === loginUser.id);

  if (!user || !chats) return <div>loading...</div>;

  return (
    <div className="friends-list">
      <h1 className="font-bold text-2xl px-2 pt-2">Friends</h1>
      <div className="flex flex-col">
        {user.friends.map((friend) => {
          return (
            <Link
              key={friend.id}
              to={`/user/${friend.id}`}
              className="hover:bg-zinc-600 hover:bg-opacity-40 rounded transition duration-200 p-2"
            >
              <button className="font-semibold">{friend.username}</button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsList;
