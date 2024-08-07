const express = require("express");
const { ref, push, get, serverTimestamp } = require("firebase/database");
const { db } = require("../../firebaseConfig");
const router = express.Router();

// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "User is not authenticated" });
}

const generateChatRoomId = (userId, adminId) => {
  return [userId, adminId].sort().join("_");
};

// Middleware to log incoming requests
router.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});
// Endpoint to generate chat room ID
router.post("/generate-chat-room-id", ensureAuthenticated, (req, res) => {
  console.log("Request received to generate chat room ID");
  console.log("Request body:", req.body);
  const { userId, adminId } = req.body;

  if (!userId || !adminId) {
    return res.status(400).json({ error: "userId and adminId are required" });
  }
  const chatRoomId = generateChatRoomId(userId, adminId);
  console.log("Generated chat room ID:", chatRoomId);
  res.json({ chatRoomId });
});

router.post("/send-message", ensureAuthenticated, (req, res) => {
  const user = req.user;
  const { chatRoomId, message } = req.body;
  if (!chatRoomId || !message) {
    return res
      .status(400)
      .json({ error: "chatRoomId and message are required" });
  }
  const messagesRef = ref(db, `chatRooms/${chatRoomId}/messages`);
  push(messagesRef, {
    userId: user.id,
    username: user.username,
    message,
    timestamp: serverTimestamp(),
  })
    .then((newMessageRef) => {
      res.json({ messageId: newMessageRef.key });
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Error sending message" });
    });
});

router.get("/messages/:chatRoomId", ensureAuthenticated, (req, res) => {
  const { chatRoomId } = req.params;

  if (!chatRoomId) {
    return res.status(400).json({ error: "chatRoomId is required" });
  }
  const messagesRef = ref(db, `chatRooms/${chatRoomId}/messages`);
  get(messagesRef)
    .then((snapshot) => {
      const messages = [];
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        messages.push({ id: childSnapshot.key, ...data });
      });

      res.json(messages);
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Error fetching messages" });
    });
});

module.exports = router;
