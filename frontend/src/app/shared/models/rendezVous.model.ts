import { BaseModel } from './base.model';
import { jsonIgnore } from 'json-ignore';

export class RendezVous extends BaseModel {
  id!: string;
  nom!: string;
  email!:string;
  employer!:string;
  client!: string;
  service!: string;
  notifictionId!: String;  
  note!: String;  
  date!: String;  
  heure!: String;
  status!: String;  
  payement!: String;  
  tarifs!: String;  
}
