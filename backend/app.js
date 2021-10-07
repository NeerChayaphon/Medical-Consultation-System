const express = require('express');
const app = express();
const server = require('http').Server(app);
const {v4: uuidV4} = require('uuid');
// const {PeerServer} = require('peer');
// const peerServer = PeerServer({port: 9000, path: '/myapp'});
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({path: './config.env'});
const AppError = require('./helpers/appErrors');
const globalErrorHandler = require('./helpers/error-handler');

const io = require('socket.io')(server, {
  cors: 'localhost:3000',
});

const cors = require('cors');
app.use(cors());

const connectDB = require('./config/db');
connectDB();

// app.set('view engine', 'ejs');
// app.use(express.static('public'));

app.use(express.json());
app.use(morgan('tiny'));

// 2. Route
const doctorRoute = require('./routes/doctorRoute');
const specializationRoute = require('./routes/specializationRoute');
const appointmentRoute = require('./routes/appointmentRoute');
const patientRoute = require('./routes/patientRoute');
const followUpRoute = require('./routes/followUpRoute');
const authRoute = require('./routes/authRoute');

const api = process.env.API_URL;
app.use(`${api}/doctor`, doctorRoute);
app.use(`${api}/specialization`, specializationRoute);
app.use(`${api}/appointment`, appointmentRoute);
app.use(`${api}/patient`, patientRoute);
app.use(`${api}/followUp`, followUpRoute);
app.use(`${api}/auth`, authRoute);

// ************* This is for online offline **************
// app.get('/test/:userId', (req, res) => {
//   res.render('doctorDashBoard', {userId: req.params.userId});
// });
// app.get('/test2/:userId', (req, res) => {
//   res.render('doctorDashBoard', {userId: req.params.userId});
// });

// ************* This is for video chat **************
// app.get(`${api}/video`, (req, res) => {
//   res.redirect(`/${uuidV4()}`);
// });
// app.get('/:room', (req, res) => {
//   res.render('room', {roomId: req.params.room});
// });

const useSocket = require('./helpers/useSocket');
useSocket(io);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is Running',
  });
});

// Error Handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
