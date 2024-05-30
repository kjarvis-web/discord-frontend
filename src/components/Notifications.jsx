import { HiUser } from 'react-icons/hi2';
import { useSelector } from 'react-redux';

const Notifications = () => {
  const user = useSelector((state) => state.users.loggedUser);
  if (!user) return <div>loading...</div>;
  const friendRequests = user.friendRequests.filter((fr) => fr.status === 'pending');

  console.log(user);
  return (
    <div className="flex items-center">
      <button>
        <HiUser className="w-5 h-5" />
        {friendRequests.length !== 0 && (
          <span className="rounded-full bg-red-500 h-5 w-5 font-semibold text-xs flex items-center justify-center">
            {friendRequests.length}
          </span>
        )}
      </button>
    </div>
  );
};

export default Notifications;
