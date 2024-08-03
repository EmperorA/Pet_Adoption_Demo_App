import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

interface AuthModalsProps {
  showLogin: boolean;
  showRegister: boolean;
  handleCloseLogin: () => void;
  handleCloseRegister: () => void;
}
export default function AuthModals (){
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClose = () => setShowLogin(false);
  const handleRegisterClose = () => setShowRegister(false);

  const handleShowLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <div>
      <button onClick={handleShowLogin}>Login</button>
      <button onClick={handleShowRegister}>Register</button>

      <LoginModal show={showLogin} handleClose={handleLoginClose} handleShowRegister={handleShowRegister} />
      <RegisterModal show={showRegister} handleClose={handleRegisterClose} handleShowLogin={handleShowLogin} />
    </div>
  );
}


