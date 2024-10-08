import { Router } from "express";
import { getAdminDetails, login, logout, signup } from "../controllers/auth.controller.js";
import upload from "../uploads/multerConfig.js";
import validateToken from "../middleware/auth.middleware.js";

const router = Router(); 

router.post("/signup", signup); 

router.post("/login",login);

router.post("/logout", logout)

router.get("/admin", validateToken,   getAdminDetails)

export default router;