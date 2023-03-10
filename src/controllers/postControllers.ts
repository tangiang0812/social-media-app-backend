import { Request, Response } from "express";
import prisma from "../config/prisma";

const index = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.send(posts);
};

const showPost = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  res.send(post);
};

const updatePost = async (
  req: Request<{ id: string }, {}, { content: string; mediaLocation: string }>,
  res: Response
) => {
  const { id } = req.params;
  const { content, mediaLocation } = req.body;
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      content,
      mediaLocation,
    },
  });
  res.send(post);
};

const deletePost = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id: id,
    },
  });
  console.log(id);
  res.send(post);
};

export { showPost, updatePost, deletePost, index };
