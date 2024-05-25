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

const socket = io.connect('http://localhost:3000');

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
    }
    dispatch(getChat());
    socket.emit('join_room', id);
  }, [dispatch, loginUser, id]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      dispatch(appendMessage(data));
      console.log('msg');
      if (id !== data.chatId) {
        console.log('notify', data);
        const { notify } = chats.find((c) => c.id === data.chatId);
        const newChat = { notify: notify + 1, id: data.chatId };

        dispatch(updateNotify(newChat));
      }
    });

    socket.on('receive_edit', (data) => {
      dispatch(editMessage(data));
      console.log(data);
    });

    return () => socket.off('receive_message');
  }, [dispatch, id, chats]);

  if (loading) return <div>loading...</div>;
  const findUser = chats.find((c) => c.id === id);
  if (!findUser) {
    return <div>404</div>;
  } else {
    // socket.emit('join_room', id);

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

    const { username } = users.find((u) => u.id === findUser.user1);
    const sortedMessages = [...findUser.messages].sort((a, b) => a.created - b.created);

    return (
      <div className="flex flex-col h-full">
        <div className="bg-slate-800 flex flex-col mt-auto">
          <div className="py-4 px-2 bg-slate-950">
            <div className="flex flex-col mt-2 rounded">
              <div className="flex gap-2 text-xs">
                <p className="font-bold">{username}</p>
                <p>{findUser.date}</p>
              </div>
              <p className="message text-lg whitespace-pre-wrap">{findUser.chat}</p>
            </div>
            {sortedMessages.map((m, i) => (
              <div key={i} className="flex flex-col mt-2 rounded">
                <div
                  className={
                    m.user.username === user.username
                      ? 'flex gap-2 text-xs font-bold text-zinc-400'
                      : 'flex gap-2 text-xs font-bold text-blue-700'
                  }
                >
                  <p>{m.user.username}</p>
                  <p>{m.date}</p>
                </div>
                <div className="flex relative hover:bg-zinc-800 hover:rounded hover:bg-opacity-100 transition duration-100">
                  <p className="message text-lg whitespace-pre-wrap mr-2 overflow-auto">{m.text}</p>
                  <Dropdown message={m} />
                </div>
              </div>
            ))}
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
