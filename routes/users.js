import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controller/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken);


// router.get("/checkuser/:id", verifyToken,verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyToken,verifyAdmin,(req,res,next)=>{
//       res.send("hello user, you are logged in and you can delete your account")
// })

//UPDATE
router.put("/:id", verifyToken,verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyToken,verifyUser, deleteUser);

//GET
router.get("/:id", verifyToken,verifyUser, getUser);

//GET ALL
router.get("/",verifyToken, verifyAdmin, getUsers);

export default router;