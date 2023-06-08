import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err)  return next(createError(403, "Token is not valid!"));
    req.user = user.id;
    next();
  });
};

// export const verifyUser = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(403, "You are not authorized!"));
//     }
//   });
// };


export const verifyUser = async (req, res, next) => {
    try {
        const users = await User.findById(req.user);
       if(users.isAdmin || users.id === req.params.id){
        next()
       }
       else{
        return next(createError(403, "You are not authorized!"));
       }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  
  export const verifyAdmin = async (req, res, next) => {
    try {
        const users = await User.findById(req.user);
       if(users.isAdmin){
        next()
       }
       else{
        return next(createError(403, "You are not authorized!"));
       }
    } catch (error) {
      console.log(error);
    }
  };
  

  