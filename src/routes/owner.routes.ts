import { Router } from "express";

const OwnerRouter = Router();

OwnerRouter.put("/update/add", (req, res) => {
  res.send("Add Members to the org");
});

OwnerRouter.put("/update/remove", (req, res) => {
  res.send("Remove Members from the org");
});

export default OwnerRouter;