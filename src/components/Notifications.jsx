import { FaRegUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const user = useSelector((state) => state.users.loggedUser);
  if (!user) return <div>loading...</div>;
  const friendRequests = user.friendRequests.filter((fr) => fr.status === 'pending');

  return (
    <div>
      <Link to="/">
        <button className="flex relative items-end hover:text-blue-500 gap-1">
          <FaRegUser className="w-5 h-5 md:w-7 md:h-7" />
          <p className="text-sm font-bold">{user.username}</p>
          {friendRequests.length !== 0 && (
            <span className="rounded-full bg-red-500 h-4 w-4 font-semibold text-xs flex items-center justify-center border border-red-500 absolute -right-1 -top-2">
              {friendRequests.length}
            </span>
          )}
        </button>
      </Link>
    </div>
  );
};

export default Notifications;
