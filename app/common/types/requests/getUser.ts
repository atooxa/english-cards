import { IUser } from 'common/types/user';

export interface IGetUserRequestParams {
  login: string;
}

export interface IGetUserResponse {
  user: IUser;
}
