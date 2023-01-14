import { SongBuilder } from '../builders/SongBuilder.js';
import { MediaElement } from '../MediaElement.js';
import { AbstractMediaFactory } from './AbstractFactory.js';


export class SongFactory implements AbstractMediaFactory {
  createMedia(): MediaElement {
    return new SongBuilder().build();
  }
}
