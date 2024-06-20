import { Dependency, Injectable } from '@renderilnik/core';
import { ApiService } from './api/ApiService';

@Injectable
export class UserService {

  @Dependency
  private apiService!: ApiService;

  getUser() {
    return this.apiService.get('/user');
  }

}
