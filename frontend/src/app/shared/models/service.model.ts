
import { BaseModel } from './base.model';
import { jsonIgnore } from 'json-ignore';

export class Service extends BaseModel {
  id!: string;
  nom!: string;
  description!: string;
  delai!: string;
  prix!: string;
  image!: string;
  createdAt! :string;
}
