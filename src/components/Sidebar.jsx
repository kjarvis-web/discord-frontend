import FriendsList from './FriendsList';

const Sidebar = () => {
  return (
    <div className="bg-slate-900 h-screen row-start-2 col-start-1 col-span-2 p-2 text-sm">
      {/* <CreateChat /> */}
      <FriendsList />
    </div>
  );
};

export default Sidebar;
