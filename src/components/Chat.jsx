import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  addMessage,
  appendMessage,
  editMessage,
  getChat,
  updateNotify,
} from '../reducers/chatReducer';
import { useEffect } from 'react';
import { getLoggedUser } from '../reducers/userReducer';
import { useParams } from 'react-router-dom';
import ScrollToBottom from './ScrollToBottom';
import io from 'socket.io-client';
import { format } from 'date-fns';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
import config from '../utils/config';

const socket = io.connect(config.baseUrl);

console.log(config.baseUrl);

const Chat = () => {
  const [text, setText] = useState('');
  const user = useSelector((state) => state.users.loggedUser);
  const { chats } = useSelector((state) => state.chat);
  const loading = useSelector((state) => state.chat.loading);
  const loginUser = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const id = useParams().id;
  const users = useSelector((state) => state.users.allUsers);

  useEffect(() => {
    if (loginUser) {
      dispatch(getLoggedUser(loginUser.id));
      socket.emit('join_room', id);
      dispatch(getChat());
    } else {
      console.log('leave');
      // socket.emit('leave_all');
    }
  }, [dispatch, loginUser, id]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      dispatch(appendMessage(data));
      if (id !== data.chatId) {
        const findChat = chats.find((c) => c.id === data.chatId);
        dispatch(updateNotify({ notify: findChat.notify + 1, id: findChat.id }));
      }
    });
    socket.on('receive_edit', (data) => {
      dispatch(editMessage(data));
    });

    return () => socket.off('receive_message');
  }, [dispatch, id, chats]);

  if (loading) return <div>loading...</div>;
  const findChat = chats.find((c) => c.id === id);

  if (!findChat) {
    return <div>404</div>;
  } else {
    const handleSend = (e) => {
      const date = new Date();
      e.preventDefault();
      const message = {
        text,
        user,
        chatId: id,
        date: format(date, 'M/d/yyyy, hh:mm aa'),
        created: Date.now(),
      };
      socket.emit('send_message', id, message);
      dispatch(addMessage(id, message));
      setText('');
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend(e);
      }
    };

    const { username } = users.find((u) => u.id === findChat.user1);
    const sortedMessages = [...findChat.messages].sort((a, b) => a.created - b.created);
    if (findChat.users.length > 0)
      return (
        <div className="flex flex-col h-full">
          <div className="flex bg-zinc-600 bg-opacity-40 gap-2 p-2">
            {findChat.users.map((u) => {
              const findUsername = users.find((user) => user.id === u);
              return (
                <p className="font-semibold" key={u}>
                  {findUsername.username}
                </p>
              );
            })}
          </div>
          <div className="bg-slate-800 flex flex-col mt-auto">
            <div className="py-4 px-2 bg-slate-950">
              <div className="flex flex-col mt-2 rounded hover:bg-zinc-800 hover:bg-opacity-40 hover:rounded">
                <div className="flex gap-2 text-xs">
                  <p
                    className={
                      findChat.user1 === user.id
                        ? 'flex gap-2 text-xs font-bold text-zinc-400'
                        : 'flex gap-2 text-xs font-bold text-blue-700'
                    }
                  >
                    {username}
                  </p>
                  <p>{findChat.date}</p>
                </div>
                <p className="message text-lg whitespace-pre-wrap">{findChat.chat}</p>
              </div>
              {sortedMessages.map((m, i) => {
                const { id } = users.find((u) => u.username === m.user.username);
                return (
                  <div
                    key={i}
                    className="flex flex-col mt-2 rounded hover:bg-zinc-800 hover:bg-opacity-40 hover:rounded transition duration-200"
                  >
                    <div
                      className={
                        m.user.username === user.username
                          ? 'flex gap-2 text-xs font-bold text-zinc-400'
                          : 'flex gap-2 text-xs font-bold text-blue-700'
                      }
                    >
                      <Link to={`/user/${id}`} className="hover:underline">
                        <p>{m.user.username}</p>
                      </Link>
                      <p>{m.date}</p>
                    </div>
                    <div className="flex relative">
                      <p className="message text-lg whitespace-pre-wrap mr-2 overflow-auto">
                        {m.text}
                      </p>
                      <Dropdown message={m} />
                    </div>
                  </div>
                );
              })}
              <div className="pt-4 px-2 w-full">
                <form className="flex items-center" onSubmit={handleSend}>
                  <textarea
                    value={text}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-grow bg-zinc-100 text-zinc-950 p-2 rounded mr-4 text-sm outline-none resize-none h-10"
                    autoFocus
                    required
                  />
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm h-10"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
          <ScrollToBottom />
        </div>
      );

    // const { username } = users.find((u) => u.id === findChat.user1);
    // const sortedMessages = [...findChat.messages].sort((a, b) => a.created - b.created);
    const findUsername1 = users.find((u) => u.id === findChat.user1);
    const findUsername2 = users.find((u) => u.id === findChat.user2);
    return (
      <div className="flex flex-col h-full">
        <div className="flex bg-zinc-600 gap-2 p-2">
          {findChat.user1 === user.id ? (
            <p>{findUsername2.username}</p>
          ) : (
            <p>{findUsername1.username}</p>
          )}
        </div>
        <div className="bg-slate-800 flex flex-col mt-auto">
          <div className="py-4 px-2 bg-slate-950">
            <div className="flex flex-col mt-2 rounded hover:bg-zinc-800 hover:bg-opacity-40 hover:rounded">
              <div className="flex gap-2 text-xs">
                <p
                  className={
                    username === user.username
                      ? 'flex gap-2 text-xs font-bold text-zinc-400'
                      : 'flex gap-2 text-xs font-bold text-blue-700'
                  }
                >
                  {username}
                </p>
                <p>{findChat.date}</p>
              </div>
              <p className="message text-lg whitespace-pre-wrap">{findChat.chat}</p>
            </div>
            {sortedMessages.map((m, i) => {
              const { id } = users.find((u) => u.username === m.user.username);
              return (
                <div
                  key={i}
                  className="flex flex-col mt-2 rounded hover:bg-zinc-800 hover:bg-opacity-40 hover:rounded transition duration-200"
                >
                  <div
                    className={
                      m.user.username === user.username
                        ? 'flex gap-2 text-xs font-bold text-zinc-400'
                        : 'flex gap-2 text-xs font-bold text-blue-700'
                    }
                  >
                    <Link to={`/user/${id}`} className="hover:underline">
                      <p>{m.user.username}</p>
                    </Link>

                    <p>{m.date}</p>
                  </div>
                  <div className="flex relative">
                    <p className="message text-lg whitespace-pre-wrap mr-2 overflow-auto">
                      {m.text}
                    </p>
                    <Dropdown message={m} />
                  </div>
                </div>
              );
            })}
            <div className="pt-4 px-2 w-full">
              <form className="flex items-center" onSubmit={handleSend}>
                <textarea
                  value={text}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-grow bg-zinc-100 text-zinc-950 p-2 rounded mr-4 text-sm outline-none resize-none h-10"
                  autoFocus
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm h-10"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <ScrollToBottom />
      </div>
    );
  }
};

export default Chat;
