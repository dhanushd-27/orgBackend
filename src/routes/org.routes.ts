import { Router } from "express"

const OrgRouter = Router();

OrgRouter.get("/details", (req, res) => {
  res.send("Fetch org details");
});

// Add Owner Middleware
OrgRouter.post("/update", (req, res) => {
  res.send("Update org details");
});

// Add Owner Middleware
OrgRouter.delete("/delete", (req, res) => {
  res.send("Delete org");
});