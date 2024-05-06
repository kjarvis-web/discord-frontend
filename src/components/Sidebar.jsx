import CreateChat from './CreateChat';
import FriendsList from './FriendsList';

const Sidebar = () => {
  return (
    <div className="bg-slate-900 h-screen row-start-2 col-start-1 p-2 text-sm">
      <h1>Find User</h1>
      <CreateChat />
      <FriendsList />
    </div>
  );
};

export default Sidebar;
