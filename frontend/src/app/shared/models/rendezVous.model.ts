import { BaseModel } from './base.model';
import { jsonIgnore } from 'json-ignore';

export class RendezVous extends BaseModel {
  id: string;
  utilisateurId:string;
  reservationId: string;
  notifictionId: String;  
}
