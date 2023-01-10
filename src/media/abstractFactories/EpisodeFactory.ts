import { EpisodeBuilder } from '../builders/EpisodeBuilder';
import { MediaElement } from '../MediaElement';
import { AbstractMediaFactory } from './AbstractFactory';


export class EpisodeFactory implements AbstractMediaFactory {
  createMedia(): MediaElement {
    return new EpisodeBuilder().build();
  }
}
