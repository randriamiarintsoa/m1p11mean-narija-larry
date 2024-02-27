import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public sessionActive!: boolean;
  private serverUrl: string = environment.apiUrl;
  public user!: User;
  public token!: string;
  public type!: string;
  public userId!: string;
  private sessionData = {
    token: undefined,
    tokenExpiration: undefined,
    user: {
      email: undefined,
      id: undefined,
      role: undefined
    }
  };
  private tokenExpiration!: string;
  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();

  constructor(
    private rest: RestService
  ) {
    this.getSessionStatus().subscribe();
  }

  get userData() {
    return this.sessionData.user || JSON.parse(localStorage.getItem('sessionData')!).user;
  }

  get tokenData() {
    return this.sessionData.token || JSON.parse(localStorage.getItem('sessionData')!).token;
  }

  get isSuperAdmin(): boolean {
    return this.userData.role === User.RoleEnum.manager;
  }
  getSessionStatus(): Observable<boolean> {
    return Observable.create(async (observer:any) => {
      try {
        const token: string = localStorage.getItem('token')!;
        let tokenExpiration: number = localStorage.getItem('tokenExpiration') ? parseInt(localStorage.getItem('tokenExpiration')!, 10) : 0;
        const sessionData: any = JSON.parse(localStorage.getItem('sessionData')!);

        if (!sessionData) {

          console.log('Regenerate 0000 1', token);
          // clean all, in case of other session
          this.signout(null !);
          observer.next(false);
          return false;
        }
        if (!sessionData.user.id) {
          console.log('Regenerate 0000 2', sessionData);
          // clean all, in case of other session
          this.signout(null!);
          observer.next(false);
          return false;
        }
        this.user = sessionData;
        this.type = sessionData.role;
        if (sessionData && sessionData.user.id) {
          this.userId = sessionData.user.id;
        }
        //  this.type = user.role ;
        const now = Date.now();
        tokenExpiration = tokenExpiration;

        if (token && tokenExpiration && (tokenExpiration * 1000 > now)) {
          // const sess: any = {
          //   token: token,
          //   tokenExpiration: tokenExpiration,
          //   user: sessionData
          // };

          try {
            await this.initSession();
            observer.next(true);
          } catch (e) {
            throw e;
          }
        } else {
          try {
            const userData = await this.regenerate();
            // this.initSession(userData);
            observer.next(userData ? true : false);
          } catch (e) {
            throw e;
          }
        }
      } catch (e) {
        observer.error(e);
      }
    });

  }

  getSessionType(): string {
    if (!this.type) {
      const user = JSON.parse(localStorage.getItem('sessionData')!);
      if (user && user.role) {
        this.type = user.role;
        return this.type;
      } else {
        return '';
      }
    } else {
      return this.type;
    }
  }

  initSession(data?: any, callback?: () => void) {
    this.sessionActive = true;

    if (data) {
      localStorage.setItem('sessionData', JSON.stringify(data));
      this.sessionData = data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenExpiration', data.tokenExpiration);
    } else {
      const rawData = localStorage.getItem('sessionData');
      if (rawData) {
        try {
          // Try to get data from storage
          this.sessionData = JSON.parse(rawData);

        } catch (e) {

        }
      }
    }

    if (this.sessionData && this.sessionData.user) {
      this.user = new User(this.sessionData.user);
      this.notifyChange(this.sessionData.user);
    }

    if (callback) {
      callback();
    }
  }

  signin(user: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data: any = user;
        data.mobile = false;
        const res = await this.rest.post('/login', data);
        console.log('res login', res)
        try {
          // if (res.user.role !== 'superAdmin') {
          //   return reject();
          // }
          const dataAuth = await this.setUserSession(res);
          console.log('dataAuth', dataAuth)
          // resolve(dataAuth.user.id);
          resolve(dataAuth);
        } catch (e) {
          reject(e);
        }
      } catch (e) {
        reject(e);
      }
    });
    
  }
  setUserSession(result:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const dataAuth: any = {token: result.token, tokenExpiration: result.tokenExpiration};
      const user = result.user;
      try {
        // const users = await this.rest.get('/user/' + dataAuth._id);
        if (user) {
          dataAuth.user = {
            id: user._id,
            email: user.email,
            role: user.role,
            nom: user.nom,
            prenom: user.prenom
          };
          this.initSession(dataAuth, () => { });
          resolve(dataAuth);
        } else {
          reject(null);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  async signup(data:any, callback: (error: any) => void) {
    try {
      const res = await this.rest.post('/api/v1/register', data);
      await this.setUserSession(res);
      callback(null);
    } catch (e) {
      callback(e);
    }
  }

  // async forgotPassword(data:any, callback: (isSuccess: any) => void) {
  //   try {
  //     const res = await this.rest.post('/forgot-password', data);
  //     callback(true);
  //   } catch (e) {
  //     callback(false);
  //   }
  // }


  async forgotPassword(user: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data: any = user;
        data.mobile = false;
        const res = await this.rest.post('/forgot-password', data);
        console.log('res send email', res)
        try {
          // if (res.user.role !== 'superAdmin') {
          //   return reject();
          // }
          // const dataAuth = await this.setUserSession(res);
          // console.log('dataAuth', dataAuth)
          // resolve(dataAuth.user.id);
          resolve(res);
        } catch (e) {
          reject(e);
        }
      } catch (e) {
        reject(e);
      }
    });
    
  }


  signout(callback: () => void)  {
    localStorage.clear();
    //localStorage.clearHistory();
    //localStorage.clearCache();
    
    this.type = undefined!;
    this.user = undefined!;
    this.notifyChange(false);
    if (callback) {
      callback();
    }
  }
  


  notifyChange(data: any) {
    this.notify.next(data);
  }

  regenerate(): Promise<any> {
    const token = this.token ? this.token : localStorage.getItem('token');
    return new Promise(async (resolve, reject) => {
      if (!token) {
        return null;
      } else {
        try {
          const data = this.rest.get(this.serverUrl + '/api/v1/regenerate');
          const dataAuth = await this.setUserSession(data);
          resolve(dataAuth);
        } catch (e) {
            reject(null);
        }
      }
    });
  }

}
