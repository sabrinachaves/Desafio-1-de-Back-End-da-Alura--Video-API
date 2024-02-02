import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import ICreateVideoDTO from '@service/CreateVideo/interfaces/ICreateVideoDTO';
import ICreateVideoService from '@service/CreateVideo/interfaces/ICreateVideoService';
import { RequestHandler } from 'express';
import { CREATED } from 'http-status';

export default class CreateVideoController {
  constructor(private createVideoService: ICreateVideoService) {}

  public execute: RequestHandler = async (request, response) => {
    try {
      const { title, description, url } = request.body;

      const createVideoDTO: ICreateVideoDTO = {
        title,
        description,
        url,
      };

      const video = await this.createVideoService.handle(createVideoDTO);

      return response.status(CREATED).json(video);
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);
      const responseData = { error: errorInfo.errorMessage };

      return response.status(errorInfo.code).json(responseData);
    }
  };
}
