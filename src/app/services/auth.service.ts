import { Injectable } from '@angular/core';
import { GoogleAuthProvider, getAuth} from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Userinfo } from '../models/userinfo';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';

import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$=authState(this.auth);

   user:string='';
   isloggeduser:BehaviorSubject<boolean>;

  constructor(
    private fireauth:AngularFireAuth ,
    private route:Router,
    private auth:Auth ) {
    this.isloggeduser=new BehaviorSubject<boolean>(this.userstate);

   }



   signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  register(email:string,password:string){

    this.fireauth.createUserWithEmailAndPassword(email,password).then(() => {
      Swal.fire({
        icon: 'success',
        width: 600,
        title: 'great',
        text: 'you registered successfully',

      })
       this.route.navigate(['login'])
    },err=>{
      Swal.fire({
        icon: 'error',
        width: 600,
        title: 'Oops...',
        text: err.message,
      })
      this.route.navigate(['/register']);
    })
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }



//  async login(user:{email:string,password:string}) {
//    await  this.fireauth.signInWithEmailAndPassword(user.email,user.password).then(() => {
//       this.fireauth.currentUser.then( data  => {
//         localStorage.setItem('token',data?.uid || '');

//       })

//       this.route.navigate(['/home'])
//     },err=>{
//       alert(err.message)
//       this.route.navigate(['/login']);
//     })

//     let value=window.localStorage.getItem('token');
//     this.isloggeduser.next(true);
//     console.log(value)


//   }








    // getuser(value:string) {
  //   return (
  //     this.firestore
  //       .collection('/usersdata', ref => ref.where('uid', '==', value))
  //       // .valueChanges({ idField: 'id' });
  //       .snapshotChanges()
  //   );
  // }

  // async  getuser(value:string) {
  //   try {
  //     const snapshot = await this.firestore
  //       .collection('/usersdata')
  //       .ref.where('uid', '==', value)
  //       .get();
  //     return snapshot.docs;
  //   } catch (error) {
  //     throw error;
  //   }
  // }




  loginwithgoogle(){
    var uid='';
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(()=>{
      this.fireauth.currentUser.then( data  => {
        localStorage.setItem('uid', data?.uid || '');
       uid=data?.uid ||''
      })

      localStorage.setItem('token',uid);
       this.route.navigate(['/home'])
    },err=>{
      alert(err.message)
      this.route.navigate(['/register']);
    });
  }
  getUid(){
    var sta='';
     this.fireauth.currentUser.then( data  => {
      localStorage.setItem('uid', data?.uid || '');
     sta=data?.uid ||''
})
return sta



  }

  // logout(){


  //   this.fireauth.signOut().then(() =>{
  //     localStorage.removeItem('token')
  //     localStorage.removeItem('uid')
  //     this.isloggeduser.next(false);
  //     this.userdata.firstname='user name'

  //     this.route.navigate(['/login']);
  //   },err=>{
  //     alert(err.message)
  //   })
  // }
  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  get userstate():boolean{
    return (localStorage.getItem('token'))?true:false;
  }
  userstatuschange():Observable<boolean>{
    return this.isloggeduser.asObservable();
  }

}
