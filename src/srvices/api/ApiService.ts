import { Injectable } from '@renderilnik/core';
import { fetch } from '../../modules/fetch';
import { ApiResponsesMapping, ApiRotes } from "./ApiTypings";

@Injectable
export class ApiService {

  get<T extends ApiRotes>(route: T): Promise<ApiResponsesMapping[T]> {
    return fetch(route);
  }

}
