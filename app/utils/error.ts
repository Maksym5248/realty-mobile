import { AxiosError } from 'axios';
import { get } from 'lodash';

const getMessage = (e: AxiosError | Error) =>
  get(e, 'response.data.message') || get(e, 'message') || 'errors.unexpected_error';

export const error = {
  getMessage,
};
