import { EpisodeBuilder } from '../builders/EpisodeBuilder.js';
import { MediaElement } from '../MediaElement.js';
import { AbstractMediaFactory } from './AbstractFactory.js';


export class EpisodeFactory implements AbstractMediaFactory {
  createMedia(): MediaElement {
    return new EpisodeBuilder().build();
  }
}
