const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Extract the token from the "Authorization" header
    const token = req.headers.authorization.split(' ')[1];

    // Log the token (for debugging purposes)
    // console.log('Received Token:', token);

    // Verify the token using your secret key
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    // Set the authenticated user's ID in the request context
    req.auth = {
      userId: decodedToken.userId,
    };

    // Continue to the next middleware or route
    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};