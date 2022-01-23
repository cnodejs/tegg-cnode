import assert from 'assert';
import { md5, hmac, salt, bhash, bcompare, makeGravatar, filterUser } from '../../app/common/UserUtil';

const defaultUser = {
  _id: 'id',
  loginname: 'cnodejs',
  avatar_url: 'avatar_url',
  email: 'cnodejs@cnodejs.org',
  other: 'other',
};

describe('test/app/common/UserUtil.test.ts', () => {
  describe('md5()', () => {
    it('should work', async () => {
      assert(md5('cnode'), '6a82eee8271643ed89c8eabcca70c3f8');
    });
  });

  describe('hmac()', () => {
    it('should work', async () => {
      assert(
        hmac('cnode', 'cnode'),
        '5aa8f0fdaf3859f07a66fb0051b447d32b5b3c47932ad69dcbe64e11889e78a0',
      );
    });
  });

  describe('salt()', () => {
    it('should work', async () => {
      assert(salt().length === 32);
    });
  });

  describe('bhash()', () => {
    it('should work', async () => {
      assert(bhash('cnodejs').length === 60);
    });
  });

  describe('bcompare()', () => {
    it('should work', async () => {
      assert(bcompare('cnodejs', '$2a$10$nJNEWUl5svFNgio3bMmi3uOvyrsGehapAVF6AqoPCKcAYiELARbO6'));
    });
  });

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

      const user = filterUser(defaultUser, [
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
