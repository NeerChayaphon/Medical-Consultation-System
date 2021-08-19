const socket = io('/');

socket.on('connect', () => {
  console.log(socket.id);
  socket.emit('online-doctor', socket.id, USERID);
});

socket.on('updateuserList', (users) => {
  console.log(users);
});
