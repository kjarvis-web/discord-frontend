import { HiUser } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const user = useSelector((state) => state.users.loggedUser);
  if (!user) return <div>loading...</div>;
  const friendRequests = user.friendRequests.filter((fr) => fr.status === 'pending');

  console.log(user);
  return (
    <div>
      <Link to="/">
        <button className="flex relative">
          <HiUser className="w-7 h-7 hover:text-blue-600" />
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
