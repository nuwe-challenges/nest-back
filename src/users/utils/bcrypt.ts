import * as bcrypt from 'bcrypt';

export const encrypt = async (
  notEncryptedPassword: string,
): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(notEncryptedPassword, salt);

  return hash;
};
