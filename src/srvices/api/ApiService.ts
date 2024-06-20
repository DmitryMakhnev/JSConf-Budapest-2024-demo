import { Injectable, Either } from '@renderilnik/core';
import { NetworkException } from '../../exceptions/NetworkException';
import { fetch } from '../../modules/fetch';
import { ApiResponsesMapping, ApiRotes } from "./ApiTypings";

@Injectable
export class ApiService {

  async get<T extends ApiRotes>(route: T): Promise<Either<NetworkException, ApiResponsesMapping[T]>> {
    try {
      const data = await fetch(route);
      return Either.right(data);
    } catch (e) {
      if (e instanceof Error) {
        return Either.left(new NetworkException(e.message));
      }
      throw e;
    }
  }

}
