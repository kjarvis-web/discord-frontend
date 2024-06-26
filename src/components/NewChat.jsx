import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addChat, addGroupChat } from '../reducers/chatReducer';
import { useNavigate } from 'react-router-dom';
import { setRecipient } from '../reducers/userReducer';

const NewChat = () => {
  const recipient = useSelector((state) => state.users.recipient);
  const [chat, setChat] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.login.user);
  const { chats } = useSelector((state) => state.chat);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipient || usernames.length <= 1) {
      const findChat = chats.find(
        (chat) => chat.user1 === usernames[0] || chat.user2 === usernames[0]
      );
      if (findChat) {
        return navigate(`/chat/${findChat.id}`);
      }
      const newChat = {
        chat,
        recipient: recipient ? recipient : usernames[0],
      };
      dispatch(addChat(newChat))
        .then((newChat) => {
          if (newChat.id) {
            navigate(`/chat/${newChat.id}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const newChat = {
        users: [...usernames, loggedUser.id],
        chat,
      };
      dispatch(addGroupChat(newChat))
        .then((newChat) => {
          if (newChat.id) {
            navigate(`/chat/${newChat.id}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const findUser = useSelector((state) => state.users.allUsers.find((u) => u.id === recipient));
  const users = useSelector((state) => state.users.allUsers);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const removeRecipient = () => {
    dispatch(setRecipient(null));
  };

  const handleGroup = () => {
    setError('');
    const search = users.find((u) => u.username.toLowerCase() === query.toLowerCase());
    if (!search) {
      return setError('no user');
    }
    if (usernames.find((u) => u === search.id)) {
      return setError('username already added');
    }
    setUsernames((state) => [...state, search.id]);
    setQuery('');
  };

  if (!findUser)
    return (
      <div className="p-2 w-full h-full flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-9">
          <div className="md:col-span-3 md:col-start-4 flex gap-x-2 items-center">
            <label htmlFor="compose" className="font-semibold text-sm">
              Create Group:
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-zinc-900 rounded-md text-sm p-2 outline-none grow"
              name="compose"
              placeholder="add username..."
            />
            <button
              onClick={handleGroup}
              className="p-2 bg-blue-600 rounded-md text-sm hover:bg-blue-500"
            >
              Add
            </button>
          </div>
          <div className="mt-4 flex flex-col md:col-start-4">
            {error !== '' && <div className="text-red-500 capitalize font-semibold">{error}</div>}
            <h1 className="font-semibold">Recipients: </h1>
            {usernames &&
              usernames.map((u, i) => {
                const user = users.find((user) => user.id === u);
                return (
                  <div className="text-sm" key={i}>
                    {user.username}
                  </div>
                );
              })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center mt-auto">
          <textarea
            onKeyDown={handleKeyDown}
            onChange={(e) => setChat(e.target.value)}
            className="flex-grow bg-zinc-100 text-zinc-950 p-2 rounded mr-4 text-sm outline-none resize-none h-10"
            autoFocus
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm h-10"
          >
            Send
          </button>
        </form>
      </div>
    );
  return (
    <div className=" w-full h-full flex flex-col">
      <h1 className="bg-zinc-700 bg-opacity-40 p-2 relative">
        Sending message to {findUser.username}
      </h1>
      <button className="absolute right-1" onClick={removeRecipient}>
        Delete
      </button>
      <form onSubmit={handleSubmit} className="flex items-center mt-auto p-2">
        <textarea
          onKeyDown={handleKeyDown}
          onChange={(e) => setChat(e.target.value)}
          className="flex-grow bg-zinc-100 text-zinc-950 p-2 rounded mr-4 text-sm outline-none resize-none h-10"
          autoFocus
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm h-10"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default NewChat;
