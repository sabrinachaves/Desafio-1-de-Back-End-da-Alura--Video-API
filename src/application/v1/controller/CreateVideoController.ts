import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import ICreateVideoService from '@service/CreateVideo/ICreateVideoService';
import { RequestHandler } from 'express';
import { CREATED } from 'http-status';

export default class CreateVideoController {
  constructor(private createVideoService: ICreateVideoService) {}

  public execute: RequestHandler = async (request, response) => {
    try {
      const createVideo = request.body;

      const video = await this.createVideoService.handle(createVideo);

      console.log(`video created - id: ${video._id}`);

      return response.status(CREATED).json(video);
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);
      const responseData = { error: errorInfo.errorMessage };

      console.log(`fail to create video`, errorInfo, request, responseData);

      return response.status(errorInfo.code).json(responseData);
    }
  };
}
