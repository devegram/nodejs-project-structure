export default (req, res, next) => {
  const clientIP = req.ip; // Get the client's IP address
  // check if the client IP is the HQ Server IP
  if (clientIP.includes('xxx.xxx.xxx.xxx')) {
    next();
  } else {
    _sys.util.webResponse.forbidden(res, 'Access denied');
  }
};
