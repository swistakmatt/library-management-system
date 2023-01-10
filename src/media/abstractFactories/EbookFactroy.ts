import { EbookBuilder } from '../builders/EbookBuilder';
import { MediaElement } from '../MediaElement';
import { AbstractMediaFactory } from './AbstractFactory';


export class EbookFactory implements AbstractMediaFactory {
  createMedia(): MediaElement {
    return new EbookBuilder().build();
  }
}
