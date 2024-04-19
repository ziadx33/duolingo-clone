import bcrpt from "bcrypt";

const BCRYPT_SALT = 10;

export const hash = async (value: string) => {
  const hashedValue = await bcrpt.hash(value, BCRYPT_SALT);
  return hashedValue;
};

export { BCRYPT_SALT };
