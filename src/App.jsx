import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loggedUser } from './reducers/loginReducer';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './components/Chat';
import Homepage from './components/Homepage';

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
      <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <Navbar />
          <Sidebar />
          <div className="row-start-2 col-span-3 md:col-span-11">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/chats/:id" element={<Chat />} />
            </Routes>
          </div>
          <div className="col-start-1 col-span-4 md:col-span-12">
            <Footer />
          </div>
        </div>
      </main>
    </Router>
  );
}

export default App;
