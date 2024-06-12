import { Link } from 'react-router-dom';
import Search from './Search';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import Notifications from './Notifications';
import Compose from './Compose';
import { useState } from 'react';

const Navbar = () => {
  const loginUser = useSelector((state) => state.login.user);
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-slate-800 md:row-start-1 md:col-start-1 md:col-span-12 p-2">
      <div className="flex md:justify-between items-center md:px-8">
        <Link to={'/'}>
          <button className="text-4xl font-bold">discord lite</button>
        </Link>
        {loginUser && (
          <>
            <div className="items-center gap-1 hidden md:flex">
              <Compose />
              <Search />
            </div>
            <div className="items-center gap-4 hidden md:flex">
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
