import { SongBuilder } from '../builders/SongBuilder';
import { MediaElement } from '../MediaElement';
import { AbstractMediaFactory } from './AbstractFactory';


export class SongFactory implements AbstractMediaFactory {
  createMedia(): MediaElement {
    return new SongBuilder().build();
  }
}
