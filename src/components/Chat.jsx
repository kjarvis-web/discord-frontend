import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addMessage, getChat } from '../reducers/chatReducer';
import { useEffect } from 'react';
import { getLoggedUser } from '../reducers/userReducer';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const [text, setText] = useState('');
  const recipient = useSelector((state) => state.users.recipient);
  const user = useSelector((state) => state.users.loggedUser);
  const { chats } = useSelector((state) => state.chat);
  const loading = useSelector((state) => state.chat.loading);
  const loginUser = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const id = useParams().id;

  useEffect(() => {
    if (loginUser) {
      dispatch(getLoggedUser(loginUser.id));
    }
    dispatch(getChat());
  }, [dispatch, loginUser]);

  if (loading) return <div>loading...</div>;

  if (chats) {
    const findUser = chats.find((c) => c.id == id);

    const handleSend = () => {
      const message = {
        text,
        user1: user,
        chatId: id,
      };
      dispatch(addMessage(id, message));
    };

    return (
      <div className="chat-box bg-slate-700 overflow-y-auto h-screen">
        <h1>Sending message to {recipient}</h1>
        <p>{findUser.chat}</p>
        {findUser.messages.map((m, i) => (
          <p key={i}>{m.text}</p>
        ))}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-zinc-950"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    );
  }
};

export default Chat;
