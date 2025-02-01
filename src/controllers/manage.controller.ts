import { Request, Response } from "express";
import { OrgModel } from "../models/org.model";
import { UserModel } from "../models/user.model";

export const addMember = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;
    const { id } = req.params;

    if(!userId) {
      res.status(400).send("User ID is required");
      return;
    }

    // Issue to be resolved - repeated members in the list
    
    const isSuccess = await OrgModel.findByIdAndUpdate(id , {
      $push: {
        members: {
          userId,
          role
        },
      },
    });

    if(!isSuccess) {
      res.status(404).json({
        message: "Organization not found",
      });
      return;
    }

    const addOrg = await UserModel.findByIdAndUpdate( userId , {
      $push: {
        organizations: {
          orgId: id,
          role,
        },
      },
    });

    if(!addOrg) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "Member added successfully",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export const removeMember = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    if(!userId) {
      res.status(400).send("User ID is required");
      return;
    }

    await OrgModel.findByIdAndUpdate( id, {
      $pull: {
        members: {
          userId,
        },
      },
    });

    const removeOrg = await UserModel.findByIdAndUpdate( userId , {
      $pull: {
        organizations: {
          orgId: id,
        },
      },
    });

    if(!removeOrg) {
      res.status(404).send("User not found");
      return;
    }

    res.status(200).send("Member removed successfully");
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error
    })
  };
};

export const updateRole = async (req: Request, res: Response) => {
  const { userId, role } = req.body;
  const { id } = req.params;

  if(!userId) {
    res.status(400).send("User ID is required");
    return;
  }

  const isSuccess = await OrgModel.updateOne(
    {
      _id: id,
      "members.userId": userId,
    },
    {
      $set: {
        "members.$.role": role,
      },
    }
  );

  if(!isSuccess) {
    res.status(404).send("Organization not found or User not found");
    return;
  }

  res.status(200).send("Role updated successfully");
};