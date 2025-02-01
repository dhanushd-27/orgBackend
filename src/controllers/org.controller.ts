import { Request, Response } from "express";
import { OrgModel } from "../models/org.model";

export const createOrg = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { name, description, logo } = req.body;
    const newOganization = await OrgModel.create({
      name,
      description,
      logo,
      owner: id,
      members: [
        { userId: id, role: "Owner" },
        { userId: id, role: "Admin" }
      ]
    });
  
    res.status(200).json({
      message: "Organization created successfully",
      newOganization
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error
    });
  }
}

export const getOrgDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const org = await OrgModel.findById(id);

    res.status(200).json({
      message: "Organization Details fetched successfully",
      org
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error
    });
  }
}

export const updateOrgDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Delete owner from the request body
    delete req.body.owner;

    const org = await OrgModel.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      message: "Organization Details updated successfully",
      org
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error
    });
  }
}

export const deleteOrg = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await OrgModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Organization deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error
    });
  }
}