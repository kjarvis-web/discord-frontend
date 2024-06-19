import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import { IoChatbubble } from 'react-icons/io5';
import { FaUserFriends } from 'react-icons/fa';
import LoginForm from './LoginForm';
import { useSelector } from 'react-redux';

const MobileSidebar = ({handleToggle}) => {
  const user = useSelector((state) => state.login.user);
  if (!user) return null;
  return (
    <div className="fixed bg-slate-800 w-full left-0 z-10 md:hidden">
      <ul className="text-sm font-bold flex flex-col gap-4 p-2">
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
        <LoginForm handleToggle={handleToggle}/>
      </ul>
    </div>
  );
};

export default MobileSidebar;
