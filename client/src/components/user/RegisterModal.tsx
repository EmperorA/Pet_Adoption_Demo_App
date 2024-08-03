import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import styles from './RegisterModal.module.css'


interface RegisterModalProps {
  show: boolean;
  handleClose: () => void;
  handleShowLogin: () => void;
}

function RegisterModal({ show, handleClose, handleShowLogin }: RegisterModalProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState<string>('user');
  const { register } = useAuth();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(email, password, role, (message) => {
      alert(message)});
    handleClose();
    handleShowLogin
  };

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName={styles.customModal}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Join us to help find fur-ever homes!</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <p className={styles.signUpText}>Register</p>
        <Form onSubmit={handleSubmit}>
          <div className={styles.formBox}>
          <Form.Group className={styles.fromGroup}>
            <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className={styles.formControl}
              >
                <option value="adopter">Adopter</option>
                <option value="shelter">Shelter</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles.fromGroup}>
              <Form.Control
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className={styles.fromGroup}>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className={styles.fromGroup}>
              <Form.Control
                type="password"
                placeholder="confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={styles.formControl}
              />
            </Form.Group>
            
          </div>
          <Button type="submit" className={styles.registerBtn}>
            Register
          </Button>
          <p className={styles.text}>
            Already have an account? <span className={styles.formText} onClick={handleShowLogin}>Login</span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;
