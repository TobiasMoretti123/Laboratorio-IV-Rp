import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FireAuthService } from '../Servicios/fire-auth.service'; 
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
  
    constructor(private fireAuthService: FireAuthService, private router: Router) { }
  
    canActivate(): Observable<boolean> {
      return this.fireAuthService.isAuthenticated().pipe(
        take(1),
        map(isAuthenticated => {
          if (isAuthenticated) {
            return true;
          } else {
            this.router.navigate(['/Home']);
            return false;
          }
        })
      );
    }
  }