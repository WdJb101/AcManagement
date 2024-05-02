// errorHandler

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(error.status).json({
      error: error.message,
      success: false,
      stack: process.env.APP_ENV === "production" ? undefined : error.stack,
    });
  }

  if (error.name === "NotFoundError") {
    return res.status(error.status).json({
      error: error.message,
      success: false,
      stack: process.env.APP_ENV === "production" ? undefined : error.stack,
    });
  }
  if (error.name === "BadRequestError") {
    return res.status(error.status).json({
      error: error.message,
      success: false,
      stack: process.env.APP_ENV === "production" ? undefined : error.stack,
    });
  }
  if (error.name === "InvalidEntry") {
    return res.status(error.status).json({
      error: error.message,
      success: false,
      stack: process.env.APP_ENV === "production" ? undefined : error.stack,
    });
  }

  //return res.status(500).json({ error: "Server Error", reason: error.message });
  res.status(500).json({
    success: false,
    error: error.message || "Server Error",
    stack: process.env.APP_ENV === "production" ? undefined : error.stack,
  });
};

module.exports = errorHandler;
