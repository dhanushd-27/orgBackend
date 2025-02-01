import { Router } from "express"
import { createOrg, deleteOrg, getOrgDetails, updateOrgDetails } from "../controllers/org.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ownerMiddleware } from "../middlewares/owner.middleware";
const OrgRouter = Router();

OrgRouter.post("/create", authMiddleware, createOrg);

OrgRouter.get("/details/:id", getOrgDetails);

OrgRouter.put("/update/:id", 
  authMiddleware, 
  ownerMiddleware, 
  updateOrgDetails
);

OrgRouter.delete("/delete/:id",
  authMiddleware,
  ownerMiddleware,
  deleteOrg
);

export default OrgRouter;