import { Link } from 'react-router-dom';
import Search from './Search';
import LoginForm from './LoginForm';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 row-start-1 col-start-1 col-span-12 p-2">
      <div className="flex justify-around items-center">
        <Link to={'/'}>
          <button className="text-2xl font-bold uppercase">discord</button>
        </Link>

        <Search />
        <LoginForm />
      </div>
    </nav>
  );
};

export default Navbar;
