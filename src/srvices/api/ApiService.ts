import { Injectable } from '@renderilnik/core';
import { NetworkException } from '../../exceptions/NetworkException';
import { fetch } from '../../modules/fetch';
import { ApiResponsesMapping, ApiRotes } from "./ApiTypings";

@Injectable
export class ApiService {

  async get<T extends ApiRotes>(
    route: T,
    cb: (exception: NetworkException | null, result?: ApiResponsesMapping[T]) => void
  ) {
    try {
      const data = await fetch(route);
      cb(null, data);
    } catch (e) {
      if (e instanceof Error) {
        return cb(new NetworkException(e.message));
      }
      throw e;
    }
  }

}
