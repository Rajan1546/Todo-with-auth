import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/login';
import Signup from './Pages/signup';
import Main from './Pages/main';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/signup" element={<Signup />} />
    <Route path='/main' element={<Main/>} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
