import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/loginReducer';
import CreateChat from './CreateChat';

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

  if (!user)
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-zinc-950">
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
    <div>
      <p>{user.username} logged in</p>
      <CreateChat />
    </div>
  );
};

export default LoginForm;
