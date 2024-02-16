import { BaseModel } from './base.model';
import { jsonIgnore } from 'json-ignore';

export class Service extends BaseModel {
  id: string;
  clientId: string;
  employerId: string;
  serviceId: string;
  date: string;
  status: string;
  payement: string;
  tarifs :string;
}
