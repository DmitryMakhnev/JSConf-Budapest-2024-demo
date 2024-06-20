export type UserApiModel = {
  id: string;
}

export type ApiResponsesMapping = {
  '/user': UserApiModel;
};

export type ApiRotes = keyof ApiResponsesMapping;
