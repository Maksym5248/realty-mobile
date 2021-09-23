import { ROLES } from '~/constants';

export interface ISignInParams {
  email: string;
  password: string;
}

export interface ISignUpParams extends ISignInParams {
  name: string;
}

export interface IResponse<T> {
  data: T;
}

export interface IApiTokens {
  access: {
    expires: string;
    token: string;
  };
  refresh: {
    expires: string;
    token: string;
  };
}

export interface IApiCurrentUser {
  id: string;
  name: string;
  role: ROLES;
  email: string;
}

export interface IApiAuth {
  user: IApiCurrentUser;
  tokens: IApiTokens;
}
