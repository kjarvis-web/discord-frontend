import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../reducers/userReducer';
import { useEffect } from 'react';
import { updateNotify } from '../reducers/chatReducer';

const ChatList = () => {
  const { chats } = useSelector((state) => state.chat);
  const users = useSelector((state) => state.users.allUsers);
  const loggedUser = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const handleNotify = (id) => {
    dispatch(updateNotify({ notify: 0, id: id }));
  };

  useEffect(() => {
    if (!users) {
      dispatch(getUsers());
    }
  }, [dispatch, users]);

  if (!users) return <div>loading...</div>;

  if (!loggedUser) return null;

  const sorted = [...chats].sort((a, b) => a.created - b.created);

  return (
    <div className="chat-list">
      <h1 className="font-bold text-2xl p-2">Chats</h1>
      <div className="flex flex-col">
        {sorted.map((c) => {
          const user = users.find(
            (u) => u.id !== loggedUser.id && (u.id === c.user1 || u.id === c.user2)
          );
          return (
            user && (
              <div
                key={c.id}
                className="flex justify-between p-2 hover:bg-zinc-800 hover:bg-opacity-50 rounded"
              >
                <Link to={`/chats/${c.id}`} onClick={() => handleNotify(c.id)}>
                  <button className="flex">{user.username}</button>
                </Link>
                {c.notify !== 0 && (
                  <span className="rounded-full bg-red-500 h-5 w-5 font-semibold text-xs flex items-center justify-center">
                    {c.notify}
                  </span>
                )}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
