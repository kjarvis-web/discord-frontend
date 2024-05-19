import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMessage } from '../reducers/chatReducer';
import { useEffect } from 'react';

const EditForm = ({ message, setOpen }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const handleEdit = (e) => {
    e.preventDefault();
    const newMessage = {
      text,
      id: message.id,
      chatId: message.chatId,
    };
    dispatch(updateMessage(newMessage));
    setOpen(false);
  };

  useEffect(() => {
    setText(message.text);
  }, [message.text]);

  return (
    <form onSubmit={handleEdit} className="w-full relative">
      <textarea
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-zinc-950 rounded text-sm w-full h-full outline-none p-1"
      />
      <button
        className="absolute text-xs border border-zinc-900 text-zinc-900 rounded-full bottom-0 right-5 p-1 my-1"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default EditForm;
