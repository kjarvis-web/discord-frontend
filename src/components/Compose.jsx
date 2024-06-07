import { BiMessageAdd } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Compose = () => {
  return (
    <div>
      <Link to="chat/new">
        <button className="flex items-center">
          <BiMessageAdd className="w-6 h-6" />
        </button>
      </Link>
    </div>
  );
};

export default Compose;
