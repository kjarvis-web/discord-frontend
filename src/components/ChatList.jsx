import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../reducers/userReducer';
import { useEffect } from 'react';

const ChatList = () => {
  const { chats } = useSelector((state) => state.chat);
  const users = useSelector((state) => state.users.allUsers);
  const loggedUser = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users) {
      dispatch(getUsers());
    }
  }, [dispatch, users]);

  if (!users) return <div>loading...</div>;

  return (
    <div className="chat-list">
      <h1 className="font-bold text-2xl">Chats</h1>
      <div className="flex flex-col">
        {chats.map((c) => {
          const user = users.find(
            (u) => u.id !== loggedUser.id && (u.id === c.user1 || u.id === c.user2)
          );
          return (
            user && (
              <Link key={c.id} to={`/chats/${c.id}`}>
                <button>{user.username}</button>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
