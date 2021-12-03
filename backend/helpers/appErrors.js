// AppError.js use to create custom error module

// AppError will extend the building Error feature in Express. It use to make easier to read error message.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    // Error detail
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// export as AppError
module.exports = AppError;
