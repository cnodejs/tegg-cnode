import {
  Context,
  EggContext,
  HTTPBody,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
} from '@eggjs/tegg';

import { AbstractController } from './AbstractController';
import { UserSchemaType } from '@/app/common/schema/UserSchema';
import { userValidate } from '@/app/common/AjvUtil';
import { pickUserField } from '@/app/common/UserUtil';
import { bhash, bcompare } from '@/app/common/CryptUtil';

@HTTPController({
  path: '/api/auth',
})
export class AuthController extends AbstractController {
  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '/signin',
  })
  async signin(@Context() ctx: EggContext, @HTTPBody() data: any) {
    const administrators: string[] = this.config?.administrators;

    const loginname = data?.loginname?.toLowerCase();
    const email = data.email;
    const pass = data.pass;

    if (!loginname && !email) {
      ctx.throw('loginname or email is required', 422);
    }

    const getUser = () => {
      if (email) {
        return this.userService.getByEmail(email, []);
      }
      return this.userService.getByLoginName(loginname, []);
    };

    const user = await getUser();

    if (!user) {
      ctx.throw('loginname or email is not existed', 400);
    }

    const _pass = user.pass;
    const equal = bcompare(pass, _pass);

    if (!equal) {
      ctx.throw('password is not matched', 403);
    }

    const _user = pickUserField(user);

    if (_user) {
      _user.is_admin = _user?.loginname ? administrators.includes(_user.loginname) : false;
    }

    const token = await this.jwtService.sign(_user);

    ctx.body = {
      data: {
        user: _user,
        token,
      },
    };
  }

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '/signup',
  })
  async signup(@Context() ctx: EggContext, @HTTPBody() data: UserSchemaType) {
    if (!this.config.allowPublicRegistration) {
      ctx.throw('public registration is not allowed', 403);
    }

    const valid = userValidate(data);

    if (!valid) {
      ctx.throw(JSON.stringify(userValidate.errors), 422);
    }

    const loginname = data.loginname.toLowerCase();
    const email = data.email;
    const pass = data.pass;

    const users = await this.userService.query({
      $or: [
        { loginname },
        { email },
      ],
    });

    if (users.length > 0) {
      ctx.throw('loginname or email has been used', 400);
    }

    const password = bhash(pass);

    const user = await this.userService.create({
      loginname,
      email,
      pass: password,
    });

    ctx.body = {
      data: {
        user: pickUserField(user),
      },
    };
  }
}
