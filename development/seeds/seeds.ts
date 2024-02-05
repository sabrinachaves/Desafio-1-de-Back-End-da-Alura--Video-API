import { IVideo } from '../../src/domain/schemas/Video';

export const videoSeed: IVideo = {
  _id: '4704e7a3-a36a-47ce-afb4-f427dee5527e',
  title: 'Sabrina vai a Roma',
  description: 'Filme que narra as aventuras de uma feiticeira por Roma',
  url: 'https://www.filmes.com/Sabrina-vai-a-Roma',
};

export const videoSeeds = [videoSeed];
