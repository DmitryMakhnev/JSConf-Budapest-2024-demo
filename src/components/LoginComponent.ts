import { AbstractComponent, Dependency } from '@renderilnik/core';
import { AuthorizationService } from '../srvices/AuthorizationService';
import {UserService} from '../srvices/UserService';

export class LoginComponent extends AbstractComponent {

  @Dependency
  private authorizationService!: AuthorizationService;

  @Dependency
  private userService!: UserService;

  isLoading = false;
  isLoggedIn = false;

  async getData(): Promise<void> {
    this.isLoading = true;
    const [, exception1] = await this.authorizationService.checkAuthorization();
    const [, exception2] = await this.userService.getUser();

    this.isLoggedIn = exception1 == null && exception2 == null;
    if (exception1 != null) {
      console.log(`[${exception1.name}]: ${exception1.message}`);
    }
    if (exception2 != null) {
      console.log(`[${exception2.name}]: ${exception2.message}`);
    }
    this.isLoading = false;
  }

  render(): string {
    const { isLoading, isLoggedIn } = this;

    console.log(isLoading);
    console.log(isLoggedIn);

    return `Is logged in: ${isLoggedIn} \n Is loading: ${isLoading}`;
  }
}
