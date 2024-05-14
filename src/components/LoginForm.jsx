import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout } from '../reducers/loginReducer';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
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
  };

  if (!user)
    return (
      <div>
        <form onSubmit={handleSubmit} className="grid grid-cols-8 gap-y-2 text-zinc-950 text-sm">
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="col-start-4 col-span-2 rounded p-1"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="row-start-2 col-start-4 col-span-2 rounded p-1"
          />
          <button
            type="submit"
            className="text-slate-100 row-start-3 col-start-4 col-span-2 bg-slate-500 rounded text-base"
          >
            Log In
          </button>
        </form>
      </div>
    );

  return (
    <div className="flex gap-4 items-center text-sm">
      <p>{user.username} logged in</p>
      <button onClick={handleLogout} className="bg-slate-200 rounded-full p-2 text-zinc-900">
        Log Out
      </button>
    </div>
  );
};

export default LoginForm;
