import assert from 'assert';
import { userValidate } from '../../app/common/AjvUtil';

describe('test/app/common/AjvUtil.test.ts', () => {
  describe('userValidate', () => {

    it('should work', async () => {
      const valid = userValidate({
        loginname: 'cnodejs',
        email: 'cnodejs@cnodejs.org',
        pass: 'cnodejs',
        rePass: 'cnodejs',
      });
      assert(valid === true);
    });

    it('should return error - loginname length', async () => {
      const valid = userValidate({
        loginname: 'c',
        email: 'cnodejs@cnodejs.org',
        pass: 'cnodejs',
        rePass: 'cnodej',
      });
      assert(valid === false);
    });

    it('should return error - loginname pattern', async () => {
      const valid = userValidate({
        loginname: 'cnode+js',
        email: 'cnodejs@cnodejs.org',
        pass: 'cnodejs',
        rePass: 'cnodejs',
      });
      assert(valid === false);
    });

    it('should return error - email format', async () => {
      const valid = userValidate({
        loginname: 'cnodejs',
        email: 'cnodejs',
        pass: 'cnodejs',
        rePass: 'cnodejs',
      });
      assert(valid === false);
    });


    it('should return error - repasswod equal', async () => {
      const valid = userValidate({
        loginname: 'cnodejs',
        email: 'cnodejs@cnodejs.org',
        pass: 'cnodejs',
        rePass: 'cnode+js',
      });
      assert(valid === false);
    });

  });
});
