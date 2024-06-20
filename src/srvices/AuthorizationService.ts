import { Dependency, Injectable } from '@renderilnik/core';
import { AuthorizationException } from '../exceptions/AuthorizationException';
import { UserService } from './UserService';

@Injectable
export class AuthorizationService {

  @Dependency
  private userService!: UserService;

  checkAuthorization(
    cb: (exception: AuthorizationException | null, isAuthorized?: boolean) => void
  ) {
    this.userService.getUser((exception, user) => {
      if (exception != null) {
        return cb(new AuthorizationException(`Can't authorize user`));
      }
      cb(null, user != null);
    });
  }

}
