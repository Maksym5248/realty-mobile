import axios from 'axios';

import { config } from '~/config';

import { IApiAuth, IApiCurrentUser, IResponse, ISignInParams, ISignUpParams } from './api.types';

const { common } = axios.defaults.headers;

class ApiClass {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get = (url: string, ...params: any) => axios.get(`${this.baseUrl}/${url}`, ...params);

  post = (url: string, ...params: any) => axios.post(`${this.baseUrl}/${url}`, ...params);

  setAuthToken(token: string) {
    common.Authorization = token ? `Bearer ${token}` : undefined;
  }

  signUp = (params: ISignUpParams): Promise<IResponse<IApiAuth>> =>
    this.post('auth/register', params);

  signIn = (params: ISignInParams): Promise<IResponse<IApiAuth>> => this.post('auth/login', params);

  signOut = (params: { refreshToken: string }) => this.post('auth/logout', params);

  refreshTokens = (params: { refreshToken: string }) => this.post('auth/refresh-tokens', params);

  getCurrentUser = (): Promise<IResponse<IApiCurrentUser>> => this.get('users/current');
}

export const Api = new ApiClass(config.API_URL);
