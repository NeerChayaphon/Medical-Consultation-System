const userSocketIdMap = new Map(); //a map of online usernames and their clients

function useSocket(io) {
  let users = {};
  io.on('connection', (socket) => {
    // video chat app
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

    // video online user
    socket.on('online-user', (socketId, userId) => {
      // join add update status
      socket.join('doctor');
      users = addClientToMap(userId, socketId);
      io.to('doctor').emit('updateuserList', users);
      io.to('patient').emit('updateDoctorList', users);
      // console.log(io.sockets.adapter.rooms); // for room check

      socket.on('disconnect', () => {
        users = removeClientFromMap(userId, socketId);
        io.to('doctor').emit('updateuserList', users);
        io.to('patient').emit('updateDoctorList', users);
      });
    });

    socket.on('get-online-doctor', (fillter) => {
      let obj = JSON.parse(JSON.stringify(users));
      if (fillter != null) {
        obj = obj[fillter];
        socket.join('patient-get-socket');
        io.to('patient-get-socket').emit('patientGetSocket', obj);
      } else {
        socket.join('patient');
        io.to('patient').emit('updateDoctorList', users);
      }
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
  // console.log(obj);
  return obj;
}
module.exports = useSocket;

/*
if (checkUser(users, userId)) {
  users.push({userId, socketId: [socketId]});
} else {
  updateUser(users, userId, socketId);
}
io.emit('updateuserList', users);

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
 */
