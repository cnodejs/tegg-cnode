import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

const member = {
  id: 1,
  email: 'member@domain.com',
  role: 'admin',
  avatar: '',
  slat: '',
  hash: '',
};

describe('test/app/service/auth.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('signJWTToekn', async () => {
    const result = await ctx.service.auth.signJWTToekn(member as any);
    assert(result);
  });
});
