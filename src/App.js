import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home'; //Home Page
import Signup from './pages/Signup';
import Login from './pages/Login';
import ChatPage from '../src/pages/Chatpage';
import { useSelector } from "react-redux";
import { useState } from "react";
import {AppContext, socket } from './context/appContext';


function App() { //Navigation is outside the routes and won't ever change, but depending on the url path, a different element/page will be rendered.
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({}); //empty object not empty array
  const [newMessages, setNewMessages] = useState({});
  const user = useSelector((state) => state.user);
  
  //All the things in value are what we make available to child components. Passing an object.
  //useContext hook will let us access this.
  return (
    <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}>
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route path='/' element={<Home />} />
          {!user && (
            <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </>
        )}
          <Route path='/chatpage' element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
      </AppContext.Provider>

  );
}

export default App;
