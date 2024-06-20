import { Dependency, Injectable } from '@renderilnik/core';
import { AuthorizationException } from '../exceptions/AuthorizationException';
import { UserService } from './UserService';

@Injectable
export class AuthorizationService {

  @Dependency
  private userService!: UserService;

  async checkAuthorization(): Promise<[ void ] | [null, AuthorizationException]> {
    const [user, exception] = await this.userService.getUser();
    if (exception != null || user == null) {
      return [null, new AuthorizationException(`Can't authorize user`)];
    }
    return [undefined];
  }

}
