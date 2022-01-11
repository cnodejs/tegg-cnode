import assert from 'assert';
import { md5, hmac, slat, makeGravatar } from '../../app/common/UserUtil';

describe('test/app/common/UserUtil.test.ts', () => {
  describe('md5()', () => {
    it('should work', async () => {
      assert(md5('cnode'), '6a82eee8271643ed89c8eabcca70c3f8');
    });
  });

  describe('hmac()', () => {
    it('should work', async () => {
      assert(hmac('cnode', 'cnode'), '5aa8f0fdaf3859f07a66fb0051b447d32b5b3c47932ad69dcbe64e11889e78a0');
    });
  });

  describe('slat()', () => {
    it('should work', async () => {
      assert(slat().length === 32);
    });
  });

  describe('makeGravatar()', () => {
    it('should work', async () => {
      assert(makeGravatar('cnode@cnodejs.org'), 'http://www.gravatar.com/avatar/95eae7c0aa6aa702d22100483b742ded?size=48');
    });
  });
});