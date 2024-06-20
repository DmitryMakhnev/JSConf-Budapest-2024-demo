import { Dependency, Injectable } from '@renderilnik/core';
import { Failed } from '../exceptions/containers/Failed';
import { Ok } from '../exceptions/containers/Ok';
import { UserException } from '../exceptions/UserException';
import { ApiService } from './api/ApiService';
import { UserApiModel } from './api/ApiTypings';

@Injectable
export class UserService {

  @Dependency
  private apiService!: ApiService;

  getUser(): Promise<Ok<UserApiModel> | Failed<UserException>>{
    return this.apiService
      .get('/user')
      .then(
        result =>
          result instanceof Failed
            ? new Failed(new UserException('User not found'))
            : result
      );
  }

}
