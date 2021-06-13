import * as bcrypt from 'bcrypt';

export const compare = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword);
};
