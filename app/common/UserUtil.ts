import * as crypto from 'crypto';
import bcrypt from 'bcryptjs';

export const md5 = (signature: string) => {
  return crypto.createHash('md5').update(signature).digest('hex');
};

export const hmac = (password: string, salt: string) => {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
};

export const salt = () => {
  return crypto.randomBytes(16).toString('hex');
};

export const makeGravatar = (email: string) => {
  const _md5 = md5(email.toLowerCase());
  return `http://www.gravatar.com/avatar/${_md5}?size=48`;
};

export const bhash = (str: string) => {
  return bcrypt.hashSync(str, 10);
};

export const bcompare = (str: string, hash: string) => {
  return bcrypt.compareSync(str, hash);
};
