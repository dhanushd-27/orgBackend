import { UserModel } from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hashedPassword: string = await bcrypt.hash(password, 5);

  try {
    await UserModel.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(200).send("Signup Successfull");

  } catch (error) {
    res.status(400).json({
      message: "Signup Failed",
      error
    })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({            
      email
    });

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).send("Invalid Password");
      return;
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string);

    res.status(200).json({
      message: "Login Successfull",
      token
    });

  } catch (error) {
    res.status(400).json({
      message: "Login Failed",
      error
    })
  } 
}

export const getUserDetails = async (req: Request, res: Response)=> {
  try {
    const { id } = req.user;
    const user = await UserModel.findById({ _id: id});

    res.status(200).json({
      message: "User Details fetched successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error
    });
  }
}

export const getAllOrgs = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const user = await UserModel.findById(id);

    if(!user?.organizations){
      res.status(200).json({
        message: "No organizations found"
      });
      return;
    }

    res.status(200).json({
      message: "Organizations fetched successfully",
      organizations: user.organizations
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error
    });
  }
}

// Change this
export const updateDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { name, email } = req.body;
    const user = await UserModel.findByIdAndUpdate(id, {
      name,
      email
    }, { new: true });

    res.status(200).json({
      message: "User Details updated successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error
    });
  }
}

// export const createOrg = async (req: Request, res: Response) => 