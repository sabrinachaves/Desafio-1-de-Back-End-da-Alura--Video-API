import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IVideo {
  _id?: string;
  title: string;
  description?: string;
  url: string;
}

export const Video: Schema = new Schema<IVideo>(
  {
    _id: {
      type: String,
      default: uuidv4(),
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
