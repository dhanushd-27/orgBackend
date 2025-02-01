import { Request, Response, NextFunction } from "express";
import { OrgModel } from "../models/org.model";

export const ownerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orgId = req.params.id;
    const userId = req.user?.id;
  
    if (!orgId || !userId) {
      next(new Error("User ID or Organization ID not found"));
      return;
    }
  
    const org = await OrgModel.findById(orgId);

    if (!org) {
      next(new Error("Organization not found"));
      return;
    }

    if (org.owner.toString() !== userId) {
      next(new Error("Unauthorized"));
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
}