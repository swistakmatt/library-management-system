import { MovieBuilder } from '../builders/MovieBuilder.js';
import { MediaElement } from '../MediaElement.js';
import { AbstractMediaFactory } from './AbstractFactory.js';


export class MovieFactory implements AbstractMediaFactory {
  createMedia(): MediaElement {
    return new MovieBuilder().build();
  }
}
