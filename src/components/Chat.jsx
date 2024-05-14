import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addMessage, getChat } from '../reducers/chatReducer';
import { useEffect } from 'react';
import { getLoggedUser } from '../reducers/userReducer';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const [text, setText] = useState('');
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
      setText('');
    };

    return (
      // <div className="chat-box bg-slate-700 overflow-y-auto h-screen">
      //   <h1>Sending message to {recipient}</h1>
      //   <p>{findUser.chat}</p>
      //   {findUser.messages.map((m, i) => (
      //     <p key={i}>{m.text}</p>
      //   ))}
      //   <input
      //     type="text"
      //     value={text}
      //     onChange={(e) => setText(e.target.value)}
      //     className="text-zinc-950"
      //   />
      //   <button onClick={handleSend}>Send</button>
      // </div>
      <div className="flex flex-col relative h-full">
        <div className="flex-grow bg-slate-700 overflow-y-auto flex flex-col-reverse pb-16">
          <div className="py-4">
            {findUser.messages.map((m, i) => (
              <div key={i} className="flex flex-col bg-slate-800 mt-2">
                <div className="flex gap-2 text-xs">
                  <p>{m.user.username}</p>
                  <p>{m.date}</p>
                </div>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 absolute bottom-0 w-full">
          <div className="flex items-center">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-grow bg-zinc-100 text-zinc-950 p-2 rounded mr-4 text-sm outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Chat;
