import { AbstractComponent, Dependency } from '@renderilnik/core';
import { AuthorizationService } from '../srvices/AuthorizationService';

export class LoginComponent extends AbstractComponent {

  @Dependency
  private authorizationService!: AuthorizationService;

  isLoading = false;
  isLoggedIn = false;

  async getData(): Promise<void> {
    this.isLoading = true;
    return new Promise(resolve => {
      this.authorizationService.checkAuthorization(
        (exception, isAuthorized) => {
          if (exception != null) {
            console.log(`[${exception.name}]: ${exception.message}`);
          }
          this.isLoggedIn = isAuthorized === true;
          this.isLoading = false;
          resolve();
        }
      );
    });
  }

  render(): string {
    const { isLoading, isLoggedIn } = this;

    console.log(isLoading);
    console.log(isLoggedIn);

    return `Is logged in: ${isLoggedIn} \n Is loading: ${isLoading}`;
  }
}
