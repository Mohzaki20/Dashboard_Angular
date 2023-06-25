import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth,private route:Router) {  }


  login(email:string,password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(() => {
      localStorage.setItem('token','true');
      this.route.navigate(['/home'])
    },err=>{
      alert(err.message)
      this.route.navigate(['/login']);
    })
  }


  register(email:string,password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(() => {
      alert("register success")
      this.route.navigate(['login'])
    },err=>{
      alert(err.message)
      this.route.navigate(['/register']);
    })
  }

  loginwithgoogle(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider());
  }
  getUid() {
    var user=''
    // console.log(this.fireauth.);
     this.fireauth.currentUser.then( data  => {

      localStorage.setItem('uid', data?.uid || '');
  })
  return user;


  }

  logout(){
    this.fireauth.signOut().then(() =>{
      localStorage.removeItem('token')
      localStorage.removeItem('uid')
      this.route.navigate(['/login']);
    },err=>{
      alert(err.message)
    })
  }
}
