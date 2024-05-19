import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const users = useSelector((state) => state.users.allUsers);
  const id = useParams().id;
  const user = users.find((u) => u.id === id);
  return <div>user page {user.username}</div>;
};

export default User;
