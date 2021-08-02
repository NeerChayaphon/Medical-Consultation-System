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
      console.log(socketId, userId);
    });
  });
}

module.exports = useSocket;
