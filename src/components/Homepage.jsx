import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';

const Homepage = () => {
  const loginUser = useSelector((state) => state.login.user);
  const { allUsers } = useSelector((state) => state.users);

  if (!loginUser) {
    return (
      <div className="mt-8">
        <h1 className="text-center text-xl font-bold mb-4">Sign In</h1>
        <LoginForm />
      </div>
    );
  }
  const user = allUsers.find((u) => u.id === loginUser.id);
  // const friendRequests = user.friendRequests.filter((fr) => fr.status !== 'pending');
  return (
    <div className="mt-8 text-center">
      <h1>Friend Requests</h1>
      {/* {friendRequests.length > 0 ? (
        friendRequests.map((fr) => <p key={fr.id}>{fr.from}</p>)
      ) : (
        <p>empty</p>
      )} */}
    </div>
  );
};

export default Homepage;
