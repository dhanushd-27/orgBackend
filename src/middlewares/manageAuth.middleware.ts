import { NextFunction, Request, Response } from "express";
import { OrgModel } from "../models/org.model";

export const manageAuthMiddleware = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const id = req.user.id;
    const orgId = req.params.id;
    
    const org = await OrgModel.findById(orgId);

    if(!org) {
      res.status(404).send("Organization not found");
      return;
    }

    const isMember = org.members.find(member => member.userId?.toString() === id);

    if(!isMember) {
      res.status(403).send("You are not a member of this organization");
      return;
    }

    if(isMember.role !== "Owner" && isMember.role !== "Admin") {
      res.status(403).send("You are not authorized to perform this action");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}