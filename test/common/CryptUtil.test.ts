import assert from 'assert';
import { md5, hmac, salt, bhash, bcompare } from '@/app/common/CryptUtil';

describe('test/app/common/CryptUtil.test.ts', () => {
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
});
