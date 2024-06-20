import { Dependency, Injectable } from '@renderilnik/core';
import { UserException } from '../exceptions/UserException';
import { ApiService } from './api/ApiService';
import { UserApiModel } from './api/ApiTypings';

@Injectable
export class UserService {

  @Dependency
  private apiService!: ApiService;

  getUser(
    cb: (exception: UserException | null, user?: UserApiModel) => void
  ) {
    this.apiService.get('/user', (exception, user) => {
      if (exception != null) {
        return cb(new UserException('User not found'));
      }
      cb(null, user);
    });
  }

}
