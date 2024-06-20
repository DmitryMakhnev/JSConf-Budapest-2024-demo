import { Injectable } from '@renderilnik/core';
import { NetworkException } from '../../exceptions/NetworkException';
import { fetch } from '../../modules/fetch';
import { ApiResponsesMapping, ApiRotes } from "./ApiTypings";

@Injectable
export class ApiService {

  async get<T extends ApiRotes>(route: T): Promise<ApiResponsesMapping[T]> {
    try {
      return await fetch(route);
    } catch (e) {
      if (e instanceof Error) {
        throw new NetworkException(e.message);
      }
      throw e;
    }
  }

}
