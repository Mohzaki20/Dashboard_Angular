import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// export const userGuard: CanActivateFn = (route, state) => {
//   // return true;
//   userauth=inject(UserAuthService);

//   if(this.userauth.userstate){
//     return true;
//   }
//   else{

//   }
// };
export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if(localStorage){
    return true;
  }
  else{
    alert('Please Login First');
    router.navigate(['/login']);
    return false;
  }

};
