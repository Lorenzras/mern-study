import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test');
      console.log(decodedData, 'decodeData');
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
