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
  const handleSubmit = (e) => {
    const findChat = chats.find((chat) => chat.user1 === recipient || chat.user2 === recipient);
    e.preventDefault();
    const newChat = {
      chat,
      recipient,
    };
    dispatch(addChat(newChat));
    navigate(`/chats/${findChat.id}`);
  };
  return (
    <div>
      <h1>New Chat to {recipient}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          className="text-zinc-950"
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default NewChat;