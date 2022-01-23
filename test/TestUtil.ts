import bcrypt from 'bcryptjs';
import { Context } from 'egg';

import { JwtService } from '@/app/core/service/JwtService';
import { UserService } from '@/app/core/service/UserService';

const defaultUser = {
  loginname: 'cnodejs',
  email: 'cnodejs@cnodejs.org',
  pass: bcrypt.hashSync('cnodejs', 10),
};

export const createUser = async (ctx: Context) => {
  const jwtService = await ctx.getEggObject(JwtService);
  const userService = await ctx.getEggObject(UserService);

  let user = await userService.getByEmail(defaultUser.email, []);

  if (!user) {
    user = await userService.create(defaultUser);
  }

  const _user = user.toObject();
  delete _user.pass;

  const token = await jwtService.sign(_user);

  return {
    info: _user,
    token,
  };
};
