import { NextFunction, Request, Response } from "express";

const index = async (req: Request, res: Response) => {};

const showPost = async (req: Request<{ id: string }>, res: Response) => {
  res.send(`Post ID: ${req.params.id}`);
};

const deletePost = async (req: Request, res: Response) => {};

export { showPost, deletePost };
