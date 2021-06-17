import * as bcrypt from 'bcrypt';

export const compare = async (password: string, userPassword: string) => {
  return bcrypt.compare(password, userPassword);
};
