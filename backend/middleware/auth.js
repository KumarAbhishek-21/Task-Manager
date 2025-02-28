// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//   const { token } = req.headers;
//   if (!token) {
//     return res.json({ success: false, message: "Not Authorized login again" });
//   }
//   try {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = token_decode.id;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// export default authMiddleware;

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // console.log("JWT Secret in Backend:", process.env.JWT_SECRET);

  //   try {
  //       const token = req.headers.authorization?.split(" ")[1]; // Get token from headers

  //       if (!token) {
  //           return res.status(401).json({ message: "No token, authorization denied" });
  //       }

  //       const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
  //       req.user = decoded; // Attach user data to req

  //       next(); // Move to next middleware
  //   } catch (err) {
  //       res.status(401).json({ message: "Invalid token" });
  //   }

    const authHeader = req.headers.authorization;
    // console.log(req.headers.authorization);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer "
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        // console.log(req.headers.authorization);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default authMiddleware;
