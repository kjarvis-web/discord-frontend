import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { acceptFriendRequest, rejectFriendRequest } from '../reducers/userReducer';

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

  const handleAccept = (id) => {
    const config = {
      headers: { Authorization: `Bearer ${loginUser.token}` },
    };
    dispatch(acceptFriendRequest(id, {}, config));
  };

  const handleReject = (id) => {
    const config = {
      headers: { Authorization: `Bearer ${loginUser.token}` },
    };
    dispatch(rejectFriendRequest(id, {}, config));
  };

  const user = allUsers.find((u) => u.id === loginUser.id);
  const friendRequests = user.friendRequests.filter((fr) => fr.status === 'pending');

  return (
    <div className="mt-8 text-center">
      <h1>Friend Requests</h1>
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
