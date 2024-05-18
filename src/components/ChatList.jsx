import { useSelector } from 'react-redux';

const ChatList = () => {
  const { chats } = useSelector((state) => state.chat);
  console.log('chatlist', chats);
  return (
    <div>
      <h1 className="font-bold text-2xl">Chats</h1>
      {/* {chats.map((c) => (
        <div>{c.user.username}</div>
      ))} */}
    </div>
  );
};

export default ChatList;
