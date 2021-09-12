import { IUser } from './User.interface';

export interface IRandomUserResponse {
  readonly results?: IUser[];
  readonly info: {
    readonly seed: string;
    readonly results: number;
    readonly page: number;
    readonly version: string;
  };
}
