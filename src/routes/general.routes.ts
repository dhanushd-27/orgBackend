import { Request, Response, Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller";

const GeneralRouter = Router();

GeneralRouter.post("/signup", createUser);

GeneralRouter.post("/login", loginUser);

export default GeneralRouter;