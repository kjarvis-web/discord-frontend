import { Link } from 'react-router-dom';
import Search from './Search';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import Notifications from './Notifications';
import Compose from './Compose';

const Navbar = () => {
  const loginUser = useSelector((state) => state.login.user);
  return (
    <nav className="bg-slate-800 row-start-1 col-start-1 col-span-12 p-2">
      <div className="flex justify-between items-center px-8">
        <Link to={'/'}>
          <button className="text-4xl font-bold">discord lite</button>
        </Link>
        {loginUser && (
          <>
            <div className="flex items-center gap-1">
              <Compose />
              <Search />
            </div>
            <div className="flex items-center gap-4">
              <Notifications />
              <LoginForm />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
