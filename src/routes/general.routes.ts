import { Request, Response, Router } from "express";
import { UserModel } from "../models/user.model";

const GeneralRouter = Router();

GeneralRouter.post("/login", (req: Request, res: Response) => {
  res.send("Login route");
});

GeneralRouter.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    await UserModel.create({
      name,
      email,
      password
    });

    res.send("Signup Successfull");

  } catch (error) {
    res.json({
      message: "Signup Failed",
      error
    })
  }
});

export default GeneralRouter;