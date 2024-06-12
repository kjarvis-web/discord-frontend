import ChatList from './ChatList';
import FriendsList from './FriendsList';

const Sidebar = () => {
  return (
    <div className="bg-slate-900 text-sm md:col-span-1 md:col-start-1 md:flex md:flex-col gap-8 hidden">
      <FriendsList />
      <ChatList />
    </div>
  );
};

export default Sidebar;
