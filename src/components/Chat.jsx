import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addMessage, getChat, getMessages } from '../reducers/chatReducer';
import { useEffect } from 'react';

const Chat = () => {
  const [text, setText] = useState('');
  const recipient = useSelector((state) => state.users.recipient);
  const user = useSelector((state) => state.users.loggedUser);
  const chat = useSelector((state) => state.chat.first);
  const loading = useSelector((state) => state.chat.loading);
  const messages = useSelector((state) => state.chat.messages);
  const loginUser = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChat());
    dispatch(getMessages());
  }, [dispatch, loginUser]);

  console.log('chat', chat);
  console.log('loading', loading);
  console.log('login', loginUser);
  console.log('recipient', recipient);
  console.log('messages', messages);
  const handleSend = () => {
    const message = {
      text,
      user1: user,
      recipient,
    };
    dispatch(
      addMessage(
        chat.map((c) => c.id),
        message
      )
    );
  };

  if (loading) return <div>loading...</div>;

  if (recipient && chat && messages)
    return (
      <div className="chat-box bg-slate-700 overflow-y-auto h-screen">
        <div>Sending message to {recipient}</div>
        {chat && (
          <div>
            {chat.map((c) => {
              return (
                <div key={c.id}>
                  <p>{c.chat}</p>
                  {messages.map((m) => (
                    <p key={m.id}>{m.text}</p>
                  ))}
                </div>
              );
            })}
          </div>
        )}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-zinc-950"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    );
};

export default Chat;
