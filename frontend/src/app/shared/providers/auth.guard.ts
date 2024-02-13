// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private router: Router
) {}

canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> {
  return new Promise<boolean>(async (resolve, reject) => {
      try {
          this.sessionService.getSessionStatus()
          .subscribe((sessionStatus) => {
            console.log('sessionStatus ', sessionStatus)
              if (sessionStatus) {
                  resolve(sessionStatus);
              } else {
                  // this.utils.toastWarning('Session non autorisé, veuillez vous reconnecter');
                  this.router.navigate(['/login']);
                  reject(sessionStatus);
              }
          });
      } catch (e) {
          const token = localStorage.getItem('token');
          if (token && token.length) {
              try {
                  const data = await this.sessionService.regenerate();
                  resolve(true);
              } catch (e) {
                  reject(e);
              }
          } else {
              // this.utils.toastWarning('Session non autorisé, veuillez vous reconnecter');
              this.router.navigate(['/login']);
              reject(e);
          }
      }
  });
}
}