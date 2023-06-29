import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { Userinfo } from '../models/userinfo';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   allusersdata:[Userinfo]=[{} as Userinfo]
   user:string='';
   userdata:Userinfo={} as Userinfo;

  constructor(private fireauth:AngularFireAuth,private route:Router) {  }


  login(user:{email:string,password:string}) {
    this.fireauth.signInWithEmailAndPassword(user.email,user.password).then(() => {
      localStorage.setItem('token','true');
      this.route.navigate(['/home'])
    },err=>{
      alert(err.message)
      this.route.navigate(['/login']);
    })
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

  adduserdata(userdata:Userinfo){


    this.allusersdata.push(userdata);

  }

  getuserdata(){

    this.fireauth.currentUser.then( data  => {
      console.log(data?.email)
       this.user=data?.email||'';
    })
    this.allusersdata.map(data => {
     if(data.email==this.user){
       this.userdata=data;
       localStorage.setItem('name',data.firstname +" "+ data.lastname)
       localStorage.setItem('email',data.email)

     }
     return this.userdata;

     } )



  }
  loginwithgoogle(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(()=>{
      localStorage.setItem('token','true');
      this.route.navigate(['/home'])
    },err=>{
      alert(err.message)
      this.route.navigate(['/register']);
    });
  }
  getUid() {
    var user=''
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
