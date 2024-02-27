import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) { }
  /**
   *  post endpoint
   * @param resource exemple: '/login'
   * @param data  exemple {email: 'mean@gmail.com'}
   */
  post(resource: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = this.createRequestOptions();
      this.http.post<any>(environment.apiUrl  + resource, data, options).subscribe((observer) => {
        resolve(observer);
      }, (err) => {
        reject(err);
      });
    });
  }
  /**
   *  put endpoint
   * @param resource exemple: '/login'
   * @param data  exemple {email: 'mean@gmail.com'}
   */
  put(resource: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put<any>(environment.apiUrl  + resource, data, this.createRequestOptions()).subscribe((observer) => {
        resolve(observer);
      }, (err) => {
        reject(err);
      });
    });
  }
  /**
   *  patch endpoint
   * @param resource exemple: '/login'
   * @param data  exemple {email: 'mean@gmail.com'}
   */
  patch(resource: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.patch<any>(environment.apiUrl  + resource, data, this.createRequestOptions()).subscribe((observer) => {
        resolve(observer);
      }, (err) => {
        reject(err);
      });
    });
  }
  /**
   *  delete endpoint
   * @param resource exemple: '/login'
   * @param data  exemple {email: 'mean@gmail.com'}
   */
  delete(resource: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete<any>(environment.apiUrl  + resource, this.createRequestOptions()).subscribe((observer) => {
        resolve(observer);
      }, (err) => {
        reject(err);
      });
    });
  }
  /**
   * get endpoint
   * @param resource  exemple: '/v1/tet'
   * @param search exemple {limit: 1}
   * @param token  optional token
   */
  get(resource: string, search?: any, token?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = this.createRequestOptions();
      console.log("options rest", resource);
      if (search) {
        const params: URLSearchParams = new URLSearchParams();
        for (const key in search) {
            if (search.hasOwnProperty(key)) {
                params.set(key, search[key]);
            }
        }
        options.search = params;
      }
      this.http.get<any>(environment.apiUrl  + resource, options).subscribe((observer) => {
        resolve(observer);
      }, (err) => {
        reject(err);
      });
    });
  }

  /**
   * get endpoint
   * @param resource  exemple: '/v1/tet'
   * @param search exemple {limit: 1}
   * @param token  optional token
   */
  getAll(resource: string, search?: any, token?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let options = this.createRequestOptions();
      console.log("options rest", resource);
      console.log("options options", options);
      console.log("options search", search);

      let params: URLSearchParams = new URLSearchParams();
      if (search) {
        for (const key in search) {
            if (search.hasOwnProperty(key)) {
                params.append(key, search[key]);
            }
        }        
        options.params = params;
      }
      console.log("options options", options);
     this.http.get<any>(environment.apiUrl  + resource + '?' + params.toString(), options).subscribe((observer) => {
        resolve(observer);
      }, (err) => {
        reject(err);
      });
    });
  }
    
    /*this.http.get<any>(environment.apiUrl  + resource, options).subscribe((observer) => {
      resolve(observer);
    }, (err) => {
      reject(err);
    });
    });
    }*/
    
  private createRequestOptions(customToken?: any, dataHeader?: any) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    this.token = localStorage.getItem('token');
    console.log('this.token #### ', this.token )
    if (customToken) {
      headers = headers.append('Authorization', 'Bearer ' + customToken);
    }
    if (dataHeader) {
        for (const key in dataHeader) {
            if (dataHeader.hasOwnProperty(key)) {
              headers = headers.append(key, dataHeader[key]);
            }
        }
    } else if (this.token && !customToken) {
        headers = headers.append('Authorization', 'Bearer ' + this.token);
    }
    const options: any = {};
    options.headers = headers;
    return options;
}
}
