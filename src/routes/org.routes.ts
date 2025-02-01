import { Router } from "express"
import { createOrg, deleteOrg, getOrgDetails, updateOrgDetails } from "../controllers/org.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ownerMiddleware } from "../middlewares/owner.middleware";
import { addMember, removeMember, updateRole } from "../controllers/manage.controller";
import { manageAuthMiddleware } from "../middlewares/manageAuth.middleware";
const OrgRouter = Router();

OrgRouter.post("/create", authMiddleware, createOrg);

// Think of it's use case
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

OrgRouter.post("/:id/add-member", 
  authMiddleware,
  manageAuthMiddleware, 
  addMember);

OrgRouter.put("/:id/remove-member", 
  authMiddleware,
  manageAuthMiddleware,
  removeMember);

OrgRouter.put('/:id/update-role',
  authMiddleware,
  manageAuthMiddleware,
  updateRole);

export default OrgRouter;