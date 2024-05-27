import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { acceptFriendRequest } from '../reducers/userReducer';

const Homepage = () => {
  const loginUser = useSelector((state) => state.login.user);
  const { allUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  if (allUsers.length === 0) return <div>loading...</div>;

  if (!loginUser) {
    return (
      <div className="mt-8">
        <h1 className="text-center text-xl font-bold mb-4">Sign In</h1>
        <LoginForm />
      </div>
    );
  }

  const handleAccept = (from) => {
    const config = {
      headers: { Authorization: `Bearer ${loginUser.token}` },
    };
    dispatch(acceptFriendRequest(from, { to: loginUser.id, from: from }, config));
  };

  const handleReject = () => {};

  const user = allUsers.find((u) => u.id === loginUser.id);
  const friendRequests = user.friendRequests.filter((fr) => fr.status === 'pending');
  return (
    <div className="mt-8 text-center">
      <h1>Friend Requests</h1>
      {friendRequests.length > 0 ? (
        friendRequests.map((fr) => (
          <div key={fr.id} className="bg-zinc-600 rounded">
            <p>friend request: {fr.from}</p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => handleAccept(fr.from)}>accept</button>
              <button onClick={handleReject}>reject</button>
            </div>
          </div>
        ))
      ) : (
        <p>empty</p>
      )}
    </div>
  );
};

export default Homepage;
