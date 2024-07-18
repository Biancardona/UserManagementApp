import express from "express";
import {
    register,
    readToken,
    auth,
    profile,
    getAllUsers,
    deleteUser,
    blockUser,
    unblockUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//*** PUBLIC ACCOUNTS****

router.post("/", register);
router.get("/readToken/:token", readToken);
router.post("/login", auth);

//****  PRIVATE ACCOUNTS **** with Custom middleware
router.get("/admin", authMiddleware, getAllUsers);
router.delete("/admin/:id", authMiddleware, deleteUser);
router.put("/admin/block/:id", authMiddleware, blockUser);
router.put("/admin/:id", authMiddleware, unblockUser);


export default router;