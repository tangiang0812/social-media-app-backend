import bcrypt from "bcrypt";

const verifyPassword = async (plaitextPassword: string, hash: string) => {
  const result = await bcrypt.compare(plaitextPassword, hash);
  return result;
};

export default verifyPassword;
