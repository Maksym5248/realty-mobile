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
}

export const ApiService = new Api(config.API_URL);
