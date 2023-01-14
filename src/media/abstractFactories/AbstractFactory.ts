import { MediaElement } from '../MediaElement.js';

export interface AbstractMediaFactory {
  createMedia(): MediaElement;
}
