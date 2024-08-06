import React, { useState, useEffect } from 'react';
import { sendMessage, getMessages } from '../chatService';
import { useAuth } from '../AuthContext';
import { Message } from '../types';
import styles from './ChatModal.module.css';
import { Modal, Button } from 'react-bootstrap';

interface ChatModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ChatRoom({ isVisible, onClose }: ChatModalProps) {
  const { user, admins } = useAuth();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const chatRoomId = user && admins.length ? [user.id, admins[0].id].sort().join('_') : 'defaultRoom';

  useEffect(() => {
    if (chatRoomId !== 'defaultRoom') {
      const fetchMessages = async () => {
        try {
          const fetchedMessages = await getMessages(chatRoomId);
          setMessages(fetchedMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    }
  }, [chatRoomId]);

  const handleSendMessage = async () => {
  
    if (!user || !admins || message.trim() === '') {
      return;
    }
  
      try {
        await sendMessage(chatRoomId, message);
        setMessage('');
        const fetchedMessages = await getMessages(chatRoomId); // Fetch updated messages after sending
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error sending message:', error);
      
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
    <Modal
      show={isVisible}
      onHide={onClose}
      dialogClassName={`${styles.chatRoomDialog} ${isMinimized ? styles.minimizedDialog : styles.maximizedDialog}`}
      contentClassName={styles.chatRoomContent}
      backdrop={false}
    >
      <Modal.Header className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Chat</Modal.Title>
        <button onClick={toggleMinimize} className={styles.toggleButton}>
          {isMinimized ? 'Maximize' : 'Minimize'}
        </button>
        <Button variant="link" onClick={onClose} className={styles.closeButton}>
          X
        </Button>
      </Modal.Header>
      {!isMinimized && (
        <>
          <Modal.Body className={styles.messages}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.message} ${msg.userId === user?.id ? styles.userMessage : styles.adminMessage}`}
              >
                <strong>{msg.username}</strong>: {msg.message}
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
            <button onClick={handleSendMessage} className={styles.sendButton}>
              Send
            </button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
