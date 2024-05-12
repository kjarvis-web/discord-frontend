import { VscGithub } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="flex justify-center items-center p-2 bg-slate-800 text-zinc-100 gap-2">
      <Link className="flex items-center gap-2 group" to="https://github.com/kjarvis-web">
        <p>Kevin Jarvis</p>
        <VscGithub className="h-10 w-10 group-hover:text-blue-600" />
      </Link>
    </footer>
  );
};

export default Footer;
