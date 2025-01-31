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

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string);

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
