import {
  AccessLevel,
  ContextProto,
  Inject,
} from '@eggjs/tegg';
import { Application } from 'egg';
import { AbstractService } from './AbstractService';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class AuthService extends AbstractService {

  @Inject()
    jwt: Application['jwt'];

  async sign(user: any) {
    const { jwt: { secret } } = this.config;
    const token = this.jwt.sign(user, secret, {
      expiresIn: '2h',
    });
    return token;
  }
}
