import React, { useState, useEffect } from 'react';
import { sendMessage, getMessages } from '../chatService';
import { useAuth } from '../AuthContext';
import { Message } from '../types';
import styles from './ChatModal.module.css';
import { Modal, Button } from 'react-bootstrap';

interface ChatModalProps{
  isVisible: boolean;
  onClose: () => void;
}

export default function ChatRoom({isVisible,  onClose}: ChatModalProps) {
  const { user } = useAuth();
  const chatRoomId = 'defaultRoom';
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = getMessages(chatRoomId, setMessages);
    return () => unsubscribe();
  }, [chatRoomId]);

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      await sendMessage(chatRoomId, user.email, message);
      setMessage(''); 
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Modal show={isVisible}
    onHide={onClose}
    dialogClassName={`${styles.chatRoomDialog} ${isMinimized ? styles.minimizedDialog : styles.maximizedDialog}`}
    contentClassName={styles.chatRoomContent}
    backdrop={false} >
      <Modal.Header className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle} >Chat</Modal.Title>
        <button onClick={toggleMinimize} className={styles.toggleButton}>
          {isMinimized ? 'Maximize' : 'Minimize'}
        </button>
        <Button variant="link" onClick={onClose} className={styles.closeButton}>X</Button>
      </Modal.Header>
      {!isMinimized && (
        <>
      <Modal.Body className={styles.messages}>
        {messages.map((msg) => (
          <div key={msg.id} className={styles.message}>
            <strong>{msg.userId}</strong>: {msg.message}
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message"
        className={styles.input}
      />
      <button onClick={handleSendMessage} className={styles.sendButton}>Send</button>
      </Modal.Footer>
      </>
      )}
    </Modal>
  );
}


