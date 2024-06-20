import { Dependency, Injectable } from '@renderilnik/core';
import { UserException } from '../exceptions/UserException';
import { ApiService } from './api/ApiService';
import { UserApiModel } from './api/ApiTypings';

@Injectable
export class UserService {

  @Dependency
  private apiService!: ApiService;

  async getUser(): Promise<[UserApiModel] | [null, UserException]>{
    const [user, exception] = await this.apiService.get('/user');
    if (exception != null || user == null) {
      return [null, new UserException('User not found')];
    }
    return [user];
  }

}
