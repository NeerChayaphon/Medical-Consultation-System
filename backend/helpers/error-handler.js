/* error-handler.js use to create custom error handler for production and development 
 This will handle most of the error type and display error message in an easy to understand way
 for development and production */

// Extend custom error from app error
const AppError = require('./appErrors');

// Handleing Cast Error
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Handleing Duplicate Fields from DB
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/([""'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// Handleing Validation Error from DB
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message); // create new object by maping message
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// If in development, set this type of error
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
};

// If in production, set this type of error
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } //everything that is not marked operational
  else {
    console.error('💥 Error! 💥', err);
    res.status(err.statusCode).json({
      //status code is always 500
      status: err.status, //status is always "error"
      message: "There was an error, it's a problem from the server side! :(",
    });
  }
};

// Check for error type
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //500 because of mongoose or something else. (unknown)
  err.status = err.status || 'error';
  if (process.env.NODE_ENV == 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == 'production') {
    let error = Object.create(err);
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    sendErrorProd(error, res);
    //sendErrorProd(error, res);
  }
};
