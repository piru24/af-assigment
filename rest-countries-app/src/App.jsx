import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthFlow from './pages/AuthFlow';
import LoginForm from './pages/login';
import RegisterForm from './pages/register';
import OtpForm from './pages/otp';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/l" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/otp" element={<OtpForm/>} />
        <Route path="/login" element={<AuthFlow />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
