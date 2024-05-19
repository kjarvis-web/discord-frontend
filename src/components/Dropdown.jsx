/* eslint-disable react/prop-types */
import { useState } from 'react';
import { SlOptionsVertical, SlPencil } from 'react-icons/sl';
import EditForm from './EditForm';
import { useSelector } from 'react-redux';

const Dropdown = ({ message }) => {
  const user = useSelector((state) => state.login.user);
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };
  console.log(message.user);

  if (user.username !== message.user.username) return null;
  return (
    <div className="absolute w-full h-full">
      {open ? (
        <div className="edit flex justify-between relative h-full bg-slate-700">
          <EditForm message={message} setOpen={setOpen} />
          <SlOptionsVertical onClick={toggleMenu} className="w-4 h-4" />
        </div>
      ) : (
        <div className="edit absolute right-0">
          <SlOptionsVertical
            onClick={toggleMenu}
            className="w-4 h-4 hover:text-slate-800 hover:cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
