import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../reducers/userReducer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector((state) => state.users.error);
  const success = useSelector((state) => state.users.success);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    dispatch(addUser(user));
  };

  if (success) {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }

  if (success)
    return (
      <div className="text-center text-xl font-bold text-zinc-100">
        <p>Success! Your are now being redirected back to the homepage...</p>
      </div>
    );

  return (
    <div className="mt-8">
      <h1 className="text-center text-xl font-bold mb-4">Create Account</h1>
      {error && <div className="text-center text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="grid grid-cols-8 gap-y-2 text-zinc-950 text-sm">
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="col-start-4 col-span-2 rounded p-1 outline-none"
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
          className="text-slate-100 row-start-3 col-start-4 col-span-2 bg-slate-500 rounded text-base"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default Signup;
