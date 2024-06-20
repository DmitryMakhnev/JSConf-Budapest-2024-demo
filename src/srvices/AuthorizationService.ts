import { Dependency, Injectable, Either } from '@renderilnik/core';
import { AuthorizationException } from '../exceptions/AuthorizationException';
import { UserService } from './UserService';

@Injectable
export class AuthorizationService {

  @Dependency
  private userService!: UserService;

  async checkAuthorization(): Promise<Either<AuthorizationException, void>> {
    const user = await this.userService.getUser();
    return user
      .mapLeft(() => new AuthorizationException(`Can't authorize user`))
      .mapRight(() => {});
  }

}
