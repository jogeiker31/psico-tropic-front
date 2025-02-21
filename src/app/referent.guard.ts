import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const referentGuard: CanActivateFn = (
  route,
  state
): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    // Verificar si estamos en el navegador
    const token = localStorage.getItem('token');
    if (!token) {
      router.navigate(['/']);
      return of(false); // Retorna un Observable que emite false
    }
  } else {
    // Si no está en el navegador, puede manejarse de otra manera, por ejemplo:
    // return of(false) o un valor predeterminado
    return of(false);
  }

  // Verificar si el usuario ya está cargado
  if (authService.user) {
    if (authService.user.role === 'REFERENT') {
      return of(true);
    } else {
      router.navigate(['/']);
      return of(false);
    }
  } else {
    // Llama al método para obtener los datos del usuario
    return authService.getUserDataSuscribe().pipe(
      map((user: any) => {
        authService.user = user; // Asigna el usuario
        if (user.role === 'REFERENT') {
          return true; // Bloquea la navegación
        }

        router.navigate(['/']); // Redirige si es admin
        return false; // Bloquea la navegación
      }),
      catchError((e) => {
        console.error(e); // Manejo de errores
        router.navigate(['/']); // Redirige en caso de error
        return of(false); // Retorna un Observable que emite false
      })
    );
  }
};
