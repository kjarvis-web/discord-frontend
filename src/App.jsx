import { useDispatch } from 'react-redux';
import LoginForm from './components/LoginForm';
import { useEffect } from 'react';
import { loggedUser } from './reducers/loginReducer';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(loggedUser(user));
    }
  }, [dispatch]);
  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <div className="container mx-auto mt-24">
        <LoginForm />
      </div>
    </main>
  );
}

export default App;
