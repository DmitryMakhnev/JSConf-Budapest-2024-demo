import { Dependency, Injectable } from '@renderilnik/core';
import { NetworkException } from '../exceptions/NetworkException';
import { UserException } from '../exceptions/UserException';
import { ApiService } from './api/ApiService';

@Injectable
export class UserService {

  @Dependency
  private apiService!: ApiService;

  async getUser() {
    try {
      return await this.apiService.get('/user');
    } catch (e) {
      if (e instanceof NetworkException) {
        throw new UserException('User not found');
      }
      throw e;
    }
  }

}
