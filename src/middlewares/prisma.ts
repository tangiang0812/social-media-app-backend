import prisma from "../db/prisma";
import bcrypt from "bcrypt";

const prismaMiddleware = () => {
  prisma.$use(async (params, next) => {
    if (params.model == "User" && params.action == "create") {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(params.args.data.password, salt);
      params.args.data.password = hash;
    }
    return next(params);
  });
};

export default prismaMiddleware;
