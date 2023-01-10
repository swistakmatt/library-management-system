import { MediaElement } from '../MediaElement';

export interface AbstractMediaFactory {
  createMedia(): MediaElement;
}
