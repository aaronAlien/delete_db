import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Email from './pages/Email';
import Confirm from './pages/Confirm';
import Thanks from './pages/Thanks';
import Homepage from './pages/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/email/:token" element={<Email />} />
        <Route path="/confirm/:token" element={<Confirm />} />
        <Route path="/thanks/:token" element={<Thanks />} />
        <Route path="/app/:token" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;