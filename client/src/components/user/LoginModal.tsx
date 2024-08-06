import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import styles from './LoginModal.module.css'


interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
  handleShowRegister: () => void;
}

function LoginModal({ show, handleClose, handleShowRegister }: LoginModalProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuth();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(username, password, (message) =>{
      alert(message)});
    handleClose();
    handleShowRegister
  
    }
  return (
    <Modal show={show} onHide={handleClose}  centered className={styles.customModal}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Will you help us find our fur-ever homes?</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
      <p className={styles.signInText}>Sign In</p>
        <Form onSubmit={handleSubmit}>
          
          
          <div className={styles.formBox}>
          <Form.Group >
            
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.formControl}
            />
            <p className={styles.formText}>forgot email or password?</p>
          </Form.Group>

          <Form.Group>
           
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.formControl}            
            />
            
          </Form.Group>
          </div>
         
          <Button type="submit" className={styles.loginBtn}>
            Login
          </Button>
          
          <p className={styles.text}>No account? <span className={styles.formText} onClick={handleShowRegister}>Register</span></p>
            
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
