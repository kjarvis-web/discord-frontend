import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout } from '../reducers/loginReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user)
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex gap-2 text-zinc-950">
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="text-slate-100">
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
