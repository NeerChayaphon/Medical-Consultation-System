const userSocketIdMap = new Map(); //a map of online usernames and their clients

function useSocket(io) {
  io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId);
      socket.broadcast.to(roomId).emit('user-connected', userId);
      socket.on('message', (message) => {
        io.to(roomId).emit('createMessage', message, userId);
      });
      socket.on('disconnect', () => {
        socket.broadcast.to(roomId).emit('user-disconnected', userId);
      });
    });
    socket.on('online-doctor', (socketId, userId) => {
      addClientToMap(userId, socketId);
      socket.on('disconnect', () => {
        removeClientFromMap(userId, socketId);
      });
    });
  });
}

function addClientToMap(userId, socketId) {
  if (!userSocketIdMap.has(userId)) {
    //when user is joining first time
    userSocketIdMap.set(userId, new Set([socketId]));
  } else {
    //user had already joined from one client and now joining using another client
    userSocketIdMap.get(userId).add(socketId);
  }
  console.log(userSocketIdMap);
}

function removeClientFromMap(userId, socketId) {
  if (userSocketIdMap.has(userId)) {
    let userSocketIdSet = userSocketIdMap.get(userId);
    userSocketIdSet.delete(socketId);
    //if there are no clients for a user, remove that user from online
    if (userSocketIdSet.size == 0) {
      userSocketIdMap.delete(userId);
    }
  }
  console.log(userSocketIdMap);
}

module.exports = useSocket;
