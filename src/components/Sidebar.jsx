import ChatList from './ChatList';
import FriendsList from './FriendsList';

const Sidebar = () => {
  return (
    <div className="bg-slate-900 p-2 text-sm md:col-span-2 col-start-1 flex flex-col gap-8">
      <FriendsList />
      <ChatList />
    </div>
  );
};

export default Sidebar;
