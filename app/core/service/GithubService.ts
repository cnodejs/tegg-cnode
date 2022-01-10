import urllib from 'urllib';
import {
  AccessLevel,
  ContextProto,
} from '@eggjs/tegg';

import { AbstractService } from './AbstractService';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class GithubService extends AbstractService {
  async exchange(code: string) {
    const { client_id, client_secret, redirect_uri } = this.config.github;

    const url = 'https://github.com/login/oauth/access_token';

    const { data } = await urllib.request<AccessToken>(url, {
      dataType: 'json',
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      data: {
        client_id,
        client_secret,
        redirect_uri,
        code,
      },
    });

    if (!data.access_token) {
      return null;
    }

    return data;
  }

  async getUser(access_token: string) {
    const url = 'https://api.github.com/user';

    const { data } = await urllib.request<GithubUserInfo>(url, {
      dataType: 'json',
      method: 'GET',
      headers: {
        Authorization: `token ${access_token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!data.email) {
      return null;
    }

    return data;
  }
}

interface AccessToken {
  access_token: string;
  token_type: string;
  scope: string;
}

interface GithubUserInfo {
  id: string;
  name: string;
  login: string;
  email: string;
  avatar_url: string;
  location: string;
  bio: string;
}
