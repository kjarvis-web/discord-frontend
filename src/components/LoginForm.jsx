import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout } from '../reducers/loginReducer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HiMiniArrowLeftStartOnRectangle } from 'react-icons/hi2';
import io from 'socket.io-client';
import config from '../utils/config';

const socket = io.connect(config.baseUrl);

const LoginForm = ({ handleToggle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const error = useSelector((state) => state.login.error);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    socket.emit('leave_room');
    handleToggle();
  };

  if (!user)
    return (
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-2 md:grid md:grid-cols-8 gap-y-2 text-zinc-950 text-sm"
        >
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="col-start-4 col-span-2 rounded p-1 outline-none"
            autoFocus
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="row-start-2 col-start-4 col-span-2 rounded p-1 outline-none"
          />
          <button
            type="submit"
            className="text-slate-100 row-start-3 col-start-4 col-span-2 bg-blue-700 hover:bg-blue-600 rounded text-base p-2"
          >
            Log In
          </button>
        </form>
        {error && <p className="text-center text-red-500">Invalid username or password.</p>}
        <div className="text-center mt-8">
          <Link to={'/signup'} className="hover:underline">
            <p>Don&apos;t have an account? Sign up here.</p>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="flex gap-4 items-center text-sm">
      <button
        onClick={handleLogout}
        className="md:bg-slate-200 md:hover:bg-slate-100 md:rounded-full md:p-2 md:text-zinc-900 flex items-center gap-1"
      >
        <HiMiniArrowLeftStartOnRectangle className="w-5 h-5" />
        <span>Log Out</span>
      </button>
    </div>
  );
};

export default LoginForm;
