import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";

interface RegisterUserReqBody {
  email: string;
  password: string;
  givenName: string;
  familyName: string;
}

const registerUser = async (
  req: Request<{}, {}, RegisterUserReqBody>,
  res: Response
) => {
  const { email, password, familyName, givenName } = req.body;
  const newUser = await prisma.user.create({
    data: {
      email,
      password,
      givenName,
      familyName,
    },
  });
  res.send(newUser);
};

const authorizeUser = async (req: Request, res: Response) => {
  res.send(req.user);
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send(req.user);
  });
};

export { registerUser, authorizeUser, logoutUser };
