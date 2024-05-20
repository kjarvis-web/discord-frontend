/* eslint-disable react/prop-types */
import { SlEmotsmile } from 'react-icons/sl';
import { useSelector } from 'react-redux';

const Reaction = ({ message }) => {
  const user = useSelector((state) => state.login.user);
  if (user.username === message.user.username) return null;
  return (
    <div className="absolute right-1">
      <SlEmotsmile className="w-4 h-4" />
    </div>
  );
};

export default Reaction;
