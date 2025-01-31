import { Router } from "express";

const UserRouter = Router();

// Add Auth Middleware
UserRouter.get("/orgs", (req, res) => {
  res.send("Fetch all orgs");
});

UserRouter.get("/me", (req, res) => {
  res.send("Fetch my details");
});

UserRouter.post("/me", (req, res) => {
  res.send("Update my details");
});

UserRouter.post("/create/org", (req, res) => {
  res.send("Create an org");
});

export default UserRouter;