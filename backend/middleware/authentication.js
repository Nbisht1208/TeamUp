const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  const JWT_SECRET = process.env.JWT_SECRET;
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
export default authenticateToken;
