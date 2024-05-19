/* eslint-disable react/prop-types */
import { useState } from 'react';
import { SlOptionsVertical, SlPencil } from 'react-icons/sl';
import EditForm from './EditForm';
import { useSelector } from 'react-redux';

const Dropdown = ({ message }) => {
  const user = useSelector((state) => state.login.user);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
    setEdit(false);
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };
  console.log(message);

  if (user.username !== message.user.username) return null;
  return (
    <div className="absolute w-full h-full">
      {open ? (
        <>
          <div className="edit absolute right-0">
            <SlOptionsVertical
              onClick={toggleMenu}
              className="w-4 h-4 hover:text-slate-800 hover:cursor-pointer"
            />
            {open && !edit && (
              <ul className="absolute right-2 bg-slate-800 rounded p-2 mt-1">
                <li className="hover:cursor-pointer" onClick={toggleEdit}>
                  Edit
                </li>
                <li>Delete</li>
              </ul>
            )}
          </div>
          {edit && (
            <div className="edit flex justify-between relative h-full bg-slate-700">
              <EditForm message={message} setOpen={setOpen} />
              <SlOptionsVertical onClick={toggleMenu} className="w-4 h-4" />
            </div>
          )}
        </>
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
