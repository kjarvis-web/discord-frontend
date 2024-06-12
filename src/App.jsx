import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loggedUser } from './reducers/loginReducer';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './components/Chat';
import Homepage from './components/Homepage';
import NewChat from './components/NewChat';
import User from './components/User';
import Signup from './components/Signup';

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
    <Router>
      <main className="flex h-screen flex-col bg-slate-950 text-slate-100 font-inter">
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 h-full overflow-hidden">
          <Sidebar />
          <div className="main md:col-span-3 lg:col-span-10 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/chat/new" element={<NewChat />} />
              <Route path="/user/:id" element={<User />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
