import { Router } from "express";
import { getAllOrgs, getUserDetails, updateDetails } from "../controllers/user.controller";

const UserRouter = Router();

// Add Auth Middleware
UserRouter.get("/orgs", getAllOrgs);

UserRouter.get("/me", getUserDetails);

UserRouter.put("/me", updateDetails);

// UserRouter.post("/create/org", createOrg);

export default UserRouter;