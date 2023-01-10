import { MovieBuilder } from '../builders/MovieBuilder';
import { MediaElement } from '../MediaElement';
import { AbstractMediaFactory } from './AbstractFactory';


export class MovieFactory implements AbstractMediaFactory {
  createMedia(): MediaElement {
    return new MovieBuilder().build();
  }
}
