
import { BaseModel } from './base.model';
import { jsonIgnore } from 'json-ignore';

export class User extends BaseModel {
  @jsonIgnore()
  private pname!: string;
  id!: string;
  name!: string;
  firstname!: string;
  lastname!: string;
  email!: string;
  phone!: string;
  password!: string;
  role!: User.RoleEnum;
  avatar!: string;
  createdAt !:string;
  
  
 
  @jsonIgnore()
  isValidEmail() {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return regex.test(this.email);
  }
  @jsonIgnore()
  roleLabel(): string {
    if (this.role === User.RoleEnum.superAdmin) {
        return 'Admin';
    } else {
        return 'Membre';
    }
  }
}
export namespace User {
      export enum RoleEnum {
           admin ='admin',
            user ='user',
            standard = 'standard',
            superAdmin = 'superadmin'
          }
    }
