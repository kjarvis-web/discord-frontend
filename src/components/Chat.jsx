import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getChat } from '../reducers/chatReducer';

const Chat = () => {
  const [text, setText] = useState('');
  const recipient = useSelector((state) => state.users.recipient);
  const user = useSelector((state) => state.login.user);
  const chat = useSelector((state) => state.chat.first);
  const dispatch = useDispatch();
  console.log('chat', chat);

  //   useEffect(() => {
  //     dispatch(getChat());
  //   }, [dispatch]);

  const handleSend = () => {
    const message = {
      chat: text,
      user1: user,
      recipient,
    };
  };

  if (recipient)
    return (
      <div className="chat-box bg-slate-700 overflow-y-auto h-screen">
        {chat && (
          <div>
            {chat.map((c) => {
              return (
                <div key={c.id}>
                  <p>{c.chat}</p>
                  {c.messages.map((m) => (
                    <p key={m.id}>{m.text}</p>
                  ))}
                </div>
              );
            })}
          </div>
        )}
        <div>Sending message to {recipient}</div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={handleSend}>Send</button>
      </div>
    );
};

export default Chat;
