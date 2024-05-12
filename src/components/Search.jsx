import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers, setRecipient } from '../reducers/userReducer';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addChat } from '../reducers/chatReducer';

const Search = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.allUsers);
  const loginUser = useSelector((state) => state.login.user);
  const { chats } = useSelector((state) => state.chat);
  const recipient = useSelector((state) => state.users.recipient);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [query, setQuery] = useState('');
  const results = users.filter(
    (u) =>
      u.username.toLowerCase().includes(query.toLowerCase()) &&
      u.username.toLowerCase() !== loginUser.username.toLowerCase()
  );
  console.log('results', results);
  const handleSubmit = (e, user) => {
    e.preventDefault();
    const { id } = user;
    dispatch(setRecipient(id));
    const findChat = chats.find((chat) => chat.user1 === id || chat.user2 === id);
    if (findChat) {
      navigate(`/chats/${findChat.id}`);
    } else {
      navigate('/chats/new');
    }

    setQuery('');
  };
  return (
    <div className="find-user text-sm relative">
      <label htmlFor="search">New Message: </label>
      <input
        type="text"
        placeholder="type in username"
        className="text-zinc-950 rounded-full p-2 outline-none"
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.length > 0 && (
        <div className="absolute flex flex-col bg-slate-800 w-full">
          {results.map((u) => (
            <form key={u.id} className="flex gap-2" onSubmit={(e) => handleSubmit(e, u)}>
              <p>{u.username}</p>
              <button type="submit" className="bg-slate-300 text-zinc-950 rounded">
                Add
              </button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
