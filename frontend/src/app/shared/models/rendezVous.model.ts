import { BaseModel } from './base.model';
import { jsonIgnore } from 'json-ignore';

export class RendezVous extends BaseModel {
  id!: string;
  employerId!:string;
  clientId!: string;
  serviceId!: string;
  notifictionId!: String;  
  note!: String;  
  date!: String;  
  heure!: String;
  status!: String;  
  payement!: String;  
  tarifs!: String;  
}
