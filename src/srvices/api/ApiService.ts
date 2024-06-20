import { Injectable } from '@renderilnik/core';
import { Failed } from '../../exceptions/containers/Failed';
import { Ok } from '../../exceptions/containers/Ok';
import { NetworkException } from '../../exceptions/NetworkException';
import { fetch } from '../../modules/fetch';
import { ApiResponsesMapping, ApiRotes } from "./ApiTypings";

@Injectable
export class ApiService {

  async get<T extends ApiRotes>(route: T): Promise<Ok<ApiResponsesMapping[T]> | Failed<NetworkException>> {
    try {
      return new Ok(await fetch(route));
    } catch (e) {
      if (e instanceof Error) {
        return new Failed(new NetworkException(e.message));
      }
      throw e;
    }
  }

}
