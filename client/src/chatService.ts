import { db } from './firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { Message } from './types'; 

export const sendMessage = async (chatRoomId: string, userId: string, message: string): Promise<string> => {
  const docRef = await addDoc(collection(db, 'chatRooms', chatRoomId, 'messages'), {
    userId,
    message,
    timestamp: Timestamp.now()
  });
  return docRef.id;
};

export const getMessages = (chatRoomId: string, callback: (messages: Message[]) => void): (() => void) => {
  const q = query(collection(db, 'chatRooms', chatRoomId, 'messages'), orderBy('timestamp'));
  return onSnapshot(q, (querySnapshot) => {
    const messages: Message[] = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as Message);
    });
    callback(messages);
  });
};
