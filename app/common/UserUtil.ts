import pick from 'lodash.pick';
import { md5 } from './CryptUtil';

export const makeGravatar = (email: string) => {
  const _md5 = md5(email.toLowerCase());
  return `http://www.gravatar.com/avatar/${_md5}?size=48`;
};

export const pickUserField = (user: any, attrs?: string[]) => {
  if (!user) {
    return;
  }

  const { _id: id, loginname, avatar_url } = user;

  let target: {
    id: string;
    loginname: string;
    avatar_url: string;
  } & Record<string, any> = {
    id,
    loginname,
    avatar_url,
  };

  if (Array.isArray(attrs)) {
    target = {
      ...target,
      ...pick(user, attrs),
    };
  }

  return target;
};

