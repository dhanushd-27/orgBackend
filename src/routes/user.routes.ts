import { Router } from "express";
import { getAllOrgs, getUserDetails, updateDetails } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const UserRouter = Router();

// Add Auth Middleware
UserRouter.get("/orgs", authMiddleware, getAllOrgs);

UserRouter.get("/me", authMiddleware, getUserDetails);

UserRouter.put("/update", authMiddleware, updateDetails);

export default UserRouter;