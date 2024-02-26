import { BaseModel } from './base.model';
import { jsonIgnore } from 'json-ignore';

export class Promotion extends BaseModel {
  id: string;
  reduction: string;
  debut: string;
  fin: string;
}
