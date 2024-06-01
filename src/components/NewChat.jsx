import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addChat } from '../reducers/chatReducer';
import { useNavigate } from 'react-router-dom';

const NewChat = () => {
  const recipient = useSelector((state) => state.users.recipient);
  const [chat, setChat] = useState('');
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chat);
  const navigate = useNavigate();
  console.log('chats', chats);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newChat = {
      chat,
      recipient,
    };
    const { id } = await dispatch(addChat(newChat));
    if (id) {
      navigate(`/chats/${id}`);
    }
  };

  const findUser = useSelector((state) => state.users.allUsers.find((u) => u.id === recipient));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-2 w-full h-full flex flex-col">
      <h1 className="">Sending message to {findUser.username}</h1>
      <form onSubmit={handleSubmit} className="flex items-center mt-auto">
        {/* <input
          type="text"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          className="text-zinc-950"
        />
        <button type="submit">send</button> */}
        <textarea
          // value={text}
          onKeyDown={handleKeyDown}
          onChange={(e) => setChat(e.target.value)}
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
  );
};

export default NewChat;
