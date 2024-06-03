import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { acceptFriendRequest, rejectFriendRequest } from '../reducers/userReducer';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const loginUser = useSelector((state) => state.login.user);
  const { allUsers } = useSelector((state) => state.users);
  const { chats } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  if (!loginUser) {
    return (
      <div className="mt-8">
        <h1 className="text-center text-xl font-bold mb-4">Sign In</h1>
        <LoginForm />
      </div>
    );
  }

  if (allUsers.length === 0) return <div>loading...</div>;

  const config = {
    headers: { Authorization: `Bearer ${loginUser.token}` },
  };

  const handleAccept = (id) => {
    dispatch(acceptFriendRequest(id, {}, config));
  };

  const handleReject = (id) => {
    dispatch(rejectFriendRequest(id, {}, config));
  };

  const user = allUsers.find((u) => u.id === loginUser.id);
  const friendRequests = user.friendRequests.filter((fr) => fr.status === 'pending');

  return (
    <div className="mt-8 px-2 flex flex-col gap-2">
      <div className="user">
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <h2 className="font-semibold">All Chats</h2>
        {chats.map((c) => {
          const findUsername1 = allUsers.find((u) => u.id === c.user1);
          const findUsername2 = allUsers.find((u) => u.id === c.user2);

          if (c.users.length > 0) {
            return (
              <Link key={c.id} to={`/chats/${c.id}`}>
                <div>Group</div>
              </Link>
            );
          }
          return (
            <Link key={c.id} to={`/chats/${c.id}`}>
              <div>{c.user1 === user.id ? findUsername2.username : findUsername1.username}</div>
            </Link>
          );
        })}
      </div>
      <h1 className="font-semibold">Friend Requests</h1>
      {friendRequests.map((fr) => {
        const findUser = allUsers.find((u) => u.id === fr.from);
        if (friendRequests.length > 0) {
          return (
            <div key={fr.id} className="bg-zinc-600 rounded">
              <p>friend request: {findUser.username}</p>
              <div className="flex items-center justify-center gap-4">
                <button onClick={() => handleAccept(fr.from)}>Accept</button>
                <button onClick={() => handleReject(fr.from)}>Reject</button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Homepage;
