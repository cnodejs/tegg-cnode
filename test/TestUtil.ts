import bcrypt from 'bcryptjs';
import { Context } from 'egg';

import { JwtService } from '@/app/core/service/JwtService';
import { UserService } from '@/app/core/service/UserService';
import { pickUserField } from '@/app/common/UserUtil';

const defaultUser = {
  loginname: 'cnodejs',
  email: 'cnodejs@cnodejs.org',
  pass: 'cnodejs',
};

export const createUser = async (ctx: Context, options?: Options) => {
  const jwtService = await ctx.getEggObject(JwtService);
  const userService = await ctx.getEggObject(UserService);

  const targetUser = options?.user || defaultUser;

  let user = await userService.getByEmail(targetUser.email, []);

  if (!user) {
    const pass = bcrypt.hashSync(targetUser.pass, 10);
    user = await userService.create({
      ...targetUser,
      pass,
    });
  }

  const _user = pickUserField(user);

  if (!_user) {
    throw new Error('create user failed');
  }

  if (options?.isAdmin) {
    _user.is_admin = true;
  }

  const token = await jwtService.sign(_user);

  return {
    info: _user,
    token,
  };
};

interface Options {
  user?: {
    loginname: string;
    email: string;
    pass: string;
  };
  isAdmin? : boolean;
}
