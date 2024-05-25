/* eslint-disable react/prop-types */
import { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import EditForm from './EditForm';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { FaClipboard, FaEdit, FaTrash } from 'react-icons/fa';

const Dropdown = ({ message }) => {
  const user = useSelector((state) => state.login.user);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const menu = useRef(null);
  const toggleMenu = () => {
    setOpen(!open);
    setEdit(false);
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const closeMenus = (e) => {
    if (open && !menu.current?.contains(e.target)) {
      setOpen(!open);
      setEdit(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
  };

  document.addEventListener('mousedown', closeMenus);

  if (user.username !== message.user.username)
    return (
      <div ref={menu} className="absolute w-full h-full flex items-center">
        {open ? (
          <>
            <div className="edit absolute right-0 top-1">
              <SlOptionsVertical
                onClick={toggleMenu}
                className="w-4 h-4 hover:text-blue-600 hover:cursor-pointer"
              />
              <ul className="absolute right-2 bg-slate-800 rounded p-3 mt-1 text-sm font-semibold flex gap-4 z-10">
                <li>
                  <button
                    onClick={handleCopy}
                    className="flex gap-2 items-center hover:text-blue-500"
                  >
                    <FaClipboard className="w-4 h-4" />
                    Copy
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="edit absolute right-0 top-1">
            <SlOptionsVertical
              onClick={toggleMenu}
              className="w-4 h-4 hover:text-blue-600 hover:cursor-pointer"
            />
          </div>
        )}
      </div>
    );
  return (
    <div ref={menu} className="absolute w-full h-full flex">
      {open ? (
        <>
          <div className="edit absolute right-0 top-1">
            <SlOptionsVertical
              onClick={toggleMenu}
              className="w-4 h-4 hover:text-blue-600 hover:cursor-pointer"
            />
            {open && !edit && (
              <ul className="absolute right-2 bg-slate-800 rounded p-3 mt-1 text-sm font-semibold flex gap-4 z-10">
                <li>
                  <button
                    onClick={handleCopy}
                    className="flex gap-2 items-center hover:text-blue-500"
                  >
                    <FaClipboard className="w-4 h-4" />
                    Copy
                  </button>
                </li>
                <li
                  className="hover:cursor-pointer hover:text-blue-500 flex items-center gap-2"
                  onClick={toggleEdit}
                >
                  <FaEdit className="w-4 h-4" />
                  <button>Edit</button>
                </li>
                <li className="hover:cursor-pointer hover:text-blue-500 flex items-center gap-2">
                  <FaTrash className="w-4 h-4" />
                  <button>Delete</button>
                </li>
              </ul>
            )}
          </div>
          {edit && (
            <div className="edit flex justify-between relative h-full w-full bg-slate-950">
              <EditForm message={message} setOpen={setOpen} />
            </div>
          )}
        </>
      ) : (
        <div className="edit absolute right-0 top-1">
          <SlOptionsVertical
            onClick={toggleMenu}
            className="w-4 h-4 hover:text-blue-600 hover:cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
