import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getLoggedUser, setRecipient } from '../reducers/userReducer';

const FriendsList = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login.user);
  useEffect(() => {
    if (loginUser) {
      dispatch(getLoggedUser(loginUser.id));
      console.log('login', loginUser.id);
    }
  }, [dispatch, loginUser]);
  const user = useSelector((state) => state.users.loggedUser);

  const handleFriend = (user) => {
    dispatch(setRecipient(user));
  };

  console.log(user);
  if (!user) return <div>loading...</div>;
  return (
    <div>
      <h1 className="font-bold text-xl">Friends</h1>
      {user.friends.map((friend) => (
        <button key={friend.id} onClick={() => handleFriend(friend.username)}>
          {friend.username}
        </button>
      ))}
    </div>
  );
};

export default FriendsList;
