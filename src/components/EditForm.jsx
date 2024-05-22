/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMessage } from '../reducers/chatReducer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');

const EditForm = ({ message, setOpen }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const id = useParams().id;
  const handleEdit = (e) => {
    e.preventDefault();
    const newMessage = {
      text,
      id: message.id,
      chatId: message.chatId,
    };
    dispatch(updateMessage(newMessage));
    socket.emit('edit_message', id, newMessage);
    setOpen(false);
  };

  useEffect(() => {
    setText(message.text);
  }, [message.text]);

  return (
    <form onSubmit={handleEdit} className="w-full relative">
      <textarea
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-zinc-950 rounded text-sm w-full h-full outline-none p-1 resize-none rounded-tr-lg rounded-br-lg"
      />
      <button
        className="absolute text-sm text-zinc-100 bg-zinc-800 hover:bg-zinc-700 hover:border-zinc-700 bottom-0 right-0 rounded-tr rounded-br border border-zinc-800 h-full px-2"
        type="submit"
      >
        Edit
      </button>
    </form>
  );
};

export default EditForm;
