import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';

const Homepage = () => {
  const loginUser = useSelector((state) => state.login.user);

  if (loginUser) {
    return <div>Home</div>;
  }
  return (
    <div className="mt-8">
      <h1 className="text-center text-xl font-bold mb-4">Sign In</h1>
      <LoginForm />
    </div>
  );
};

export default Homepage;
