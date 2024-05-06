import LoginForm from './LoginForm';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 row-start-1 col-start-1 col-span-12 p-2">
      <div className="flex justify-around items-center">
        <p className="text-2xl font-bold uppercase">discord</p>
        <LoginForm />
      </div>
    </nav>
  );
};

export default Navbar;
