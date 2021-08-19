const userSocketIdMap = new Map(); //a map of online usernames and their clients

function useSocket(io) {
  let users = [];
  io.on('connection', (socket) => {
    // console.log(socket.id);
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
    socket.on('online-user', (socketId, userId) => {
      // if (checkUser(users, userId)) {
      //   users.push({userId, socketId: [socketId]});
      // } else {
      //   updateUser(users, userId, socketId);
      // }
      // io.emit('updateuserList', users);
      io.emit('updateuserList', addClientToMap(userId, socketId));

      socket.on('disconnect', () => {
        io.emit('updateuserList', removeClientFromMap(userId, socketId));
      });
    });
  });
}
function updateUser(users, userId, socketId) {
  var i;
  for (i = 0; i < users.length; i++) {
    if (users[i].userId == userId) {
      users[i].socketId.push(socketId);
      break;
    }
  }
}
function checkUser(users, userId) {
  var i;
  for (i = 0; i < users.length; i++) {
    if (users[i].userId == userId) {
      return false;
    }
  }
  return true;
}

function removeUser(users, userId, socketId) {}

function addClientToMap(userId, socketId) {
  if (!userSocketIdMap.has(userId)) {
    //when user is joining first time
    userSocketIdMap.set(userId, new Set([socketId]));
  } else {
    //user had already joined from one client and now joining using another client
    userSocketIdMap.get(userId).add(socketId);
  }
  return mapToObject(userSocketIdMap);
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
  return mapToObject(userSocketIdMap);
}

function mapToObject(userSocketIdMap) {
  const obj = Object.fromEntries(userSocketIdMap);

  Object.keys(obj).forEach((key) => {
    obj[key] = Array.from(obj[key]);
  });
  console.log(obj);
  return obj;
}
module.exports = useSocket;
