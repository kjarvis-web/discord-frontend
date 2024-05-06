import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers, setRecipient } from '../reducers/userReducer';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const CreateChat = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.allUsers);
  const recipient = useSelector((state) => state.users.recipient);
  console.log('recipient', recipient);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [query, setQuery] = useState('');
  const results = users.filter((u) => u.username.toLowerCase().includes(query.toLowerCase()));
  console.log('results', results);
  const handleSubmit = (e, user) => {
    e.preventDefault();
    const { username } = user;
    dispatch(setRecipient(username));
  };
  return (
    <div className="find-user">
      <input
        type="text"
        placeholder="type in username"
        className="text-zinc-950 w-full rounded-full p-2 outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.length > 0 && (
        <div>
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

export default CreateChat;
