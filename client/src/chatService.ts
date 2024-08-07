
import { Message } from './types';

export const getChatRoomId = async (userId: string, adminId: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:8000/api/generate-chat-room-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include',
      body: JSON.stringify({ userId, adminId })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error generating chat room ID');
    }

    const data = await response.json();
    return data.chatRoomId;
  } catch (error) {
    console.error('Error generating chat room ID:', error);
    throw error;
  }
};

export const sendMessage = async (chatRoomId: string, message: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:8000/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include',
      body: JSON.stringify({ chatRoomId, message })
    });

    if (!response.ok) {
      throw new Error('Error sending message');
    }

    const data = await response.json();
    return data.messageId;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};




export const getMessages = async (chatRoomId: string): Promise<Message[]> => {
  try {
    console.log(chatRoomId)
    const response = await fetch(`http://localhost:8000/api/messages/${chatRoomId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // or use cookies if applicable
      },
      credentials: 'include', // include cookies in the request
    });

    if (!response.ok) {
      throw new Error('Error fetching messages');
    }

    const messages = await response.json();
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

