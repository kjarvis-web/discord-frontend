import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loggedUser } from './reducers/loginReducer';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './components/Chat';
import Homepage from './components/Homepage';
import NewChat from './components/NewChat';

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
      <main className="flex flex-col bg-slate-950 text-slate-100">
        <Navbar />
        <div className="grid grid-cols-4 md:grid-cols-12 h-screen">
          <Sidebar />
          <div className="col-span-3 md:col-span-10">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/chats/:id" element={<Chat />} />
              <Route path="/chats/new" element={<NewChat />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
