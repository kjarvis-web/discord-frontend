import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers, setRecipient } from '../reducers/userReducer';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMessage } from 'react-icons/fa6';
import { IoMdCloseCircle } from 'react-icons/io';

const Search = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.allUsers);
  const loginUser = useSelector((state) => state.login.user);
  const { chats } = useSelector((state) => state.chat);
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

  const handleUser = (e, id) => {
    e.preventDefault();
    navigate(`user/${id}`);
    setQuery('');
  };
  return (
    <div className="find-user text-sm relative">
      <label htmlFor="search"></label>
      <input
        type="text"
        placeholder="type in username"
        className="text-zinc-950 rounded-md p-2 outline-none"
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.length > 0 && (
        <div className="absolute flex flex-col bg-slate-800 w-full rounded-b z-10 shadow">
          {results.map((u) => (
            <form
              key={u.id}
              className="flex justify-between mt-4 p-4"
              onSubmit={(e) => handleSubmit(e, u)}
            >
              <button
                onClick={(e) => handleUser(e, u.id)}
                className="font-semibold hover:text-blue-500"
              >
                {u.username}
              </button>
              <button type="submit" className="hover:text-blue-500">
                <FaMessage className="w-4 h-4" />
              </button>
            </form>
          ))}
          <button
            className="absolute text-zinc-300 hover:text-zinc-400 -top-7 right-1"
            onClick={() => setQuery('')}
          >
            <IoMdCloseCircle className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
