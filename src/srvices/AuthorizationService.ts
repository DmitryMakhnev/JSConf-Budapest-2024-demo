import { Dependency, Injectable } from '@renderilnik/core';
import { AuthorizationException } from '../exceptions/AuthorizationException';
import { UserException } from '../exceptions/UserException';
import { UserService } from './UserService';

@Injectable
export class AuthorizationService {

  @Dependency
  private userService!: UserService;

  async checkAuthorization(): Promise<boolean> {
    try {
      const user = await this.userService.getUser();
      return user != null;
    } catch (e) {
      if (e instanceof UserException) {
        throw new AuthorizationException(`Can't authorize user`);
      }
      throw e;
    }
  }

}
