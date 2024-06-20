import { Dependency, Injectable, Either } from '@renderilnik/core';
import { UserException } from '../exceptions/UserException';
import { ApiService } from './api/ApiService';
import { UserApiModel } from './api/ApiTypings';

@Injectable
export class UserService {

  @Dependency
  private apiService!: ApiService;

  async getUser(): Promise<Either<UserException, UserApiModel>> {
    const maybeUser = await this.apiService.get('/user');
    return maybeUser.mapLeft(() => new UserException('User not found'));
  }

}
