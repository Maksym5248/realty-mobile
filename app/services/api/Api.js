// @flow
import axios from 'axios';

import { config } from '~/config';

const { common } = axios.defaults.headers;

class Api {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  get = (url: string, ...params: any) => axios.get(`${this.baseUrl}/${url}`, ...params);
  post = (url: string, ...params: any) => axios.post(`${this.baseUrl}/${url}`, ...params);

  setAuthToken(token: string) {
    common.Authorization = token ? `Bearer ${token}` : undefined;
  }
  signUp = (params: { name: string, email: string, password: string }) =>
    this.post('auth/register', params);
  signIn = (params: { email: string, password: string }) => this.post('auth/login', params);
  signOut = (params: { refreshToken: string }) => this.post('auth/logout', params);
  refreshTokens = (params: { refreshToken: string }) => this.post('auth/refresh-tokens', params);

  getCurrentUser = () => this.get('users/current');
}

export const ApiService = new Api(config.API_URL);
