import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../reducers/userReducer';
import { useEffect } from 'react';
import { getChatAll, hideChat, updateNotify } from '../reducers/chatReducer';
import { IoMdCloseCircle } from 'react-icons/io';
import io from 'socket.io-client';
import config from '../utils/config';
const socket = io.connect(config.baseUrl);

const ChatList = () => {
  const { chats, loading } = useSelector((state) => state.chat);
  const users = useSelector((state) => state.users.allUsers);
  const loggedUser = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const handleNotify = (id) => {
    dispatch(updateNotify({ notify: 0, id: id }));
  };

  const handleClose = (e, id) => {
    e.preventDefault();
    dispatch(hideChat({ id: id, hidden: true }));
  };

  useEffect(() => {
    if (!users) {
      dispatch(getUsers());
    }
  }, [dispatch, users]);

  useEffect(() => {
    // if (!users) {
    //   dispatch(getUsers());
    // }
    if (loggedUser) {
      dispatch(getChatAll());
      // const rooms = chats.map((chat) => chat.id);
      // socket.emit('join_room', rooms);
      // console.log('join');
    }
  }, [dispatch, loggedUser]);

  // useEffect(() => {
  //   if (chats.length > 0 && !loading) {
  //     const rooms = chats.map((chat) => chat.id);
  //     socket.emit('join_room', rooms);
  //     console.log('join');
  //   }
  // }, [chats, loading]);

  if (!users) return <div>loading...</div>;

  if (!loggedUser) return null;

  const sorted = [...chats].sort((a, b) => a.created - b.created);

  return (
    <div className="chat-list">
      <h1 className="font-bold text-2xl px-2">Chats</h1>
      <div className="flex flex-col">
        {sorted.map((c) => {
          const user = users.find(
            (u) =>
              (u.id !== loggedUser.id && u.id === c.user1) ||
              u.id === c.user2 ||
              c.users.find((user) => user === loggedUser.id)
          );

          return (
            user &&
            c.hidden === false && (
              <Link key={c.id} to={`/chats/${c.id}`} onClick={() => handleNotify(c.id)}>
                <div className="relative group flex items-center justify-between p-2 hover:bg-zinc-600 hover:bg-opacity-40 rounded transition duration-200">
                  {c.user1 && c.user2 ? (
                    <button className="font-semibold">{user.username}</button>
                  ) : (
                    <button className="font-semibold">Group ({c.users.length})</button>
                  )}
                  {c.notify !== 0 && (
                    <span className="group-hover:hidden rounded-full bg-red-500 h-5 w-5 font-semibold text-xs flex items-center justify-center">
                      {c.notify}
                    </span>
                  )}
                  <button
                    onClick={(e) => handleClose(e, c.id)}
                    className="hidden group-hover:block absolute right-1 text-zinc-300 hover:text-zinc-100"
                  >
                    <IoMdCloseCircle className="w-5 h-5" />
                  </button>
                </div>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
