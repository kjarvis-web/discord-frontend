import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addMessage, appendMessage, getChat } from '../reducers/chatReducer';
import { useEffect } from 'react';
import { getLoggedUser } from '../reducers/userReducer';
import { useParams } from 'react-router-dom';
import ScrollToBottom from './ScrollToBottom';
import io from 'socket.io-client';
import { format } from 'date-fns';
const socket = io.connect('http://localhost:3000');

const Chat = () => {
  const [text, setText] = useState('');
  const user = useSelector((state) => state.users.loggedUser);
  const { chats } = useSelector((state) => state.chat);
  const loading = useSelector((state) => state.chat.loading);
  const loginUser = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const id = useParams().id;
  const [message, setMessage] = useState([]);

  useEffect(() => {
    if (loginUser) {
      dispatch(getLoggedUser(loginUser.id));
    }
    dispatch(getChat());
  }, [dispatch, loginUser]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      dispatch(appendMessage(data));
    });

    return () => socket.off('receive_message');
  }, [dispatch]);

  if (loading) return <div>loading...</div>;

  if (chats) {
    const findUser = chats.find((c) => c.id === id);
    const allMessages = findUser.messages.concat(message);
    const sortedMessages = allMessages.sort((a, b) => a.created - b.created);
    socket.emit('join_room', id);

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

    return (
      <div className="flex flex-col h-full">
        <div className="bg-slate-800 flex flex-col">
          <div className="py-4">
            {sortedMessages.map((m, i) => (
              <div key={i} className="flex flex-col mt-2 rounded">
                <div className="flex gap-2 text-xs">
                  <p className="font-bold">{m.user.username}</p>
                  <p>{m.date}</p>
                </div>
                <p className="text-lg">{m.text}</p>
              </div>
            ))}
            <div className="pt-4 px-2 w-full">
              <form className="flex items-center" onSubmit={handleSend}>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-grow bg-zinc-100 text-zinc-950 p-2 rounded mr-4 text-sm outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
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
