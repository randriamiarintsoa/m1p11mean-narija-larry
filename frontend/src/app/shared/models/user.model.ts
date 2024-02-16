
import { BaseModel } from './base.model';
import { jsonIgnore } from 'json-ignore';

export class User extends BaseModel {
  @jsonIgnore()
  private pname!: string;
  id!: string;
  nom!: string;
  prenom!: string;
  telephone!: string;
  email!: string;
  password!: string;
  role!: User.RoleEnum;
  image!: string;
  createdAt !:string;
  
  @jsonIgnore()
  isValidEmail() {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return regex.test(this.email);
  }
  @jsonIgnore()
  roleLabel(): string {
    if (this.role === User.RoleEnum.manager) {
        return 'Manager';
    } else {
        return 'Client';
    }
  }
}
export namespace User {
      export enum RoleEnum {
          manager ='manager',
          employe ='employe',
           client ='client',
            
          }
    }
