import { BaseModel } from './base.model';
import { jsonIgnore } from 'json-ignore';

export class ServiceResponsable extends BaseModel {
  id: string;
  serviceId: String;
  responsableId: String;   
}
