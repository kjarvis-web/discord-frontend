import FriendsList from './FriendsList';

const Sidebar = () => {
  return (
    <div className="bg-slate-900 p-2 text-sm md:col-span-2 col-start-1">
      <FriendsList />
    </div>
  );
};

export default Sidebar;
