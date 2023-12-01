const jwt = require('jsonwebtoken');
export default async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    _sys.util.webResponse.unauthorized(res, "unauthorized: No token provided");
  } else {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret key
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        _sys.util.webResponse.unauthorized(res, 'unauthorized: Token expired');
      } else if (error.name === 'JsonWebTokenError') {
        _sys.util.webResponse.unauthorized(res, 'unauthorized: Invalid token');
      } else {
        console.error(error);
        _sys.util.webResponse.serverError(res, 'Internal Server Error');
      }
    }
  }
};
