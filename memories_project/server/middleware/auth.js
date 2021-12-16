import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test');
      req.userId = decodedData?.id;
    } else {
      // Google Auth
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; // Google use this to identify user
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;