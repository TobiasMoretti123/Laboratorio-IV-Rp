import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { authState } from '@angular/fire/auth';
import { map } from 'rxjs';

interface AuthResult {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  constructor(private auth: Auth) { }

  login(email: string, password: string): Observable<AuthResult> {
    return new Observable(observer => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then(() => {
          observer.next({ success: true });
          observer.complete();
        })
        .catch((error) => {
          observer.next({ success: false, message: this.getErrorMessage(error.code) });
          observer.complete();
        });
    });
  }

  register(email: string, password: string): Observable<AuthResult> {
    return new Observable(observer => {
      createUserWithEmailAndPassword(this.auth, email, password)
        .then(() => {
          observer.next({ success: true });
          observer.complete();
        })
        .catch((error) => {
          observer.next({ success: false, message: this.getErrorMessage(error.code) });
          observer.complete();
        });
    });
  }

  logout(): void {
    signOut(this.auth)
    .then(() => {
      console.log('Usuario ha cerrado sesión');
    })
    .catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable(observer => {
      this.auth.onAuthStateChanged(user => {
        observer.next(!!user);
        observer.complete();
      });
    });
  }

  getUser(): Observable<User | null> {
    return authState(this.auth);
  }

  getUserEmail(): Observable<string | null> {
    return this.getUser().pipe(
      map(user => user ? user.email : null) 
    );
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'El formato del email es inválido.';
      case 'auth/user-disabled':
        return 'El usuario ha sido deshabilitado.';
      case 'auth/user-not-found':
        return 'No se encontró un usuario con ese email.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/email-already-in-use':
        return 'El email ya está en uso.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      default:
        return 'Ocurrió un error. Intenta de nuevo.';
    }
  }
}
