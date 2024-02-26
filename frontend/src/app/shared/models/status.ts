import { BaseModel } from './base.model';
import { jsonIgnore } from 'json-ignore';

export class Status extends BaseModel {
  id: string;
  status: String;  
}
