import { EbookBuilder } from '../builders/EbookBuilder.js';
import { MediaElement } from '../MediaElement.js';
import { AbstractMediaFactory } from './AbstractFactory.js';


export class EbookFactory implements AbstractMediaFactory {
  createMedia(): MediaElement {
    return new EbookBuilder().build();
  }
}
