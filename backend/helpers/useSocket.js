/* useSocket.js is for implimentation of all socket.io feature such as 
    1. video consultation 
    2. video consultation room
    3. doctor availability 
  These function will work with the front-end for real-time communication */ 


const userSocketIdMap = new Map(); //a map of online usernames and their clients

function useSocket(io) {
  let users = {};
  io.on('connection', (socket) => {
    // ** video chat app **
    // join consultation room
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId);
      socket.broadcast.to(roomId).emit('user-connected', userId);

      // sent message to other to join
      socket.on('message', (message) => {
        io.to(roomId).emit('createMessage', message, userId);
      });

      // disconnect from the room
      socket.on('disconnect', () => {
        socket.broadcast.to(roomId).emit('user-disconnected', userId);
      });
    });

    // ** doctor availability **
    socket.on('online-user', (socketId, userId) => {
      // doctor join the available doctor room
      users = addClientToMap(userId, socketId);

      // doctor exit the online doctor room
      socket.on('disconnect', () => {
        users = removeClientFromMap(userId, socketId);
      });
    });

    // client get the online doctor list
    socket.on('get-online-doctor', (fillter) => {
      socket.join(fillter);
      io.to(fillter).emit('updateDoctorList', users);
    });

    // ** video consultation **
    // patient make a call
    socket.on('call', (socketId, message) => {
      let rooms = mapToObject(io.sockets.adapter.rooms); // set request to doctor
      if (!rooms[message.url]) {
        console.log(message.url + ' is Available');
        io.to(socketId).emit('retrieve', message);
        io.to(message.from).emit('availableCall', true);
      } else {
        console.log(message.url + ' is Not Available');
        io.to(message.from).emit('availableCall', false);
      }
    });

    // doctor answer call 
    socket.on('answerCall', (fromId, status) => {
      io.to(fromId).emit('retrieveCall', status);
    });
  });
}

// This function is use for adding the doctor to the available doctor room 
// Doctor that are in that room are doctor who online and can have consult with patient.
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

// This function is use for removing the doctor to the available doctor room when the doctor is offline
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

// This is a reusable function for change the javascript map to object type
function mapToObject(userSocketIdMap) {
  const obj = Object.fromEntries(userSocketIdMap);

  Object.keys(obj).forEach((key) => {
    obj[key] = Array.from(obj[key]);
  });
  return obj;
}
module.exports = useSocket;

