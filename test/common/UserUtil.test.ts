import assert from 'assert';
import { makeGravatar, pickUserField } from '@/app/common/UserUtil';

const defaultUser = {
  _id: 'id',
  loginname: 'cnodejs',
  avatar_url: 'avatar_url',
  email: 'cnodejs@cnodejs.org',
  other: 'other',
};

describe('test/app/common/UserUtil.test.ts', () => {
  describe('makeGravatar()', () => {
    it('should work', async () => {
      assert(
        makeGravatar('cnode@cnodejs.org'),
        'http://www.gravatar.com/avatar/95eae7c0aa6aa702d22100483b742ded?size=48',
      );
    });
  });

  describe('filterUser()', () => {
    it('should work', async () => {

      const user = pickUserField(defaultUser, [
        'email',
      ]);

      assert(user?.id === defaultUser._id);
      assert(user?.loginname === defaultUser.loginname);
      assert(user?.avatar_url === defaultUser.avatar_url);
      assert(user?.email === defaultUser.email);
      assert(user?.other === undefined);
    });
  });
});
