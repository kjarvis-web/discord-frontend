import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import { IoChatbubble } from 'react-icons/io5';
import { FaUserFriends } from 'react-icons/fa';

const MobileSidebar = () => {
  return (
    <div>
      <ul className="text-sm font-bold flex flex-col gap-4">
        <Link to="/friends">
          <li className="flex gap-1 hover:text-blue-500">
            <FaUserFriends className="w-5 h-5" />
            <p>Friends</p>
          </li>
        </Link>
        <Link to="/messages">
          <li className="flex gap-1 hover:text-blue-500">
            <IoChatbubble className="w-5 h-5" />
            <p>Messages</p>
          </li>
        </Link>
        <Notifications />
      </ul>
    </div>
  );
};

export default MobileSidebar;
