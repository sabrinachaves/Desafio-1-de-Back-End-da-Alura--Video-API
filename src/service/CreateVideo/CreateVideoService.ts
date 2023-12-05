import IVideoRepository from '@domain/repositories/video/IVideoRepository';
import ICreateVideoService from './interfaces/ICreateVideoService';
import { IVideo } from '@domain/schemas/Video';
import { v4 as uuidv4 } from 'uuid';
import ICreateVideoDTO from './interfaces/ICreateVideoDTO';

export default class CreateVideoService implements ICreateVideoService {
  constructor(private videoRepository: IVideoRepository) {}

  public async handle({ title, description, url }: ICreateVideoDTO): Promise<IVideo> {
    let createVideoData: IVideo = {
      _id: uuidv4(),
      title,
      description,
      url,
    };

    const video = await this.videoRepository.create(createVideoData);
    return video;
  }
}
