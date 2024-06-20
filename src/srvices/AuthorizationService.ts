import { Dependency, Injectable } from '@renderilnik/core';
import { Failed } from '../exceptions/containers/Failed';
import { Ok } from '../exceptions/containers/Ok';
import { AuthorizationException } from '../exceptions/AuthorizationException';
import { UserService } from './UserService';

@Injectable
export class AuthorizationService {

  @Dependency
  private userService!: UserService;

  checkAuthorization(): Promise<Ok<void> | Failed<AuthorizationException>> {
    return this.userService
      .getUser()
      .then(
        result =>
          result instanceof Failed
            ? new Failed(new AuthorizationException(`Can't authorize user`))
            : undefined
      )
  }

}
