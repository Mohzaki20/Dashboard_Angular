import { Injectable } from '@angular/core';
import { GoogleAuthProvider, authState} from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Userinfo } from '../models/userinfo';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //  currentUser$ = authState(this.auth);

   allusersdata:[Userinfo]=[{} as Userinfo]
   user:string='';
   userdata:Userinfo={} as Userinfo;
   isloggeduser:BehaviorSubject<boolean>;

  constructor(private fireauth:AngularFireAuth,private route:Router,private firestore: AngularFirestore ) {
      this.userdata.firstname="user name"
    this.isloggeduser=new BehaviorSubject<boolean>(this.userstate);

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

 async login(user:{email:string,password:string}) {
   await  this.fireauth.signInWithEmailAndPassword(user.email,user.password).then(() => {
      this.fireauth.currentUser.then( data  => {
        localStorage.setItem('token',data?.uid || '');

      })

      this.route.navigate(['/home'])
    },err=>{
      alert(err.message)
      this.route.navigate(['/login']);
    })

    let value=window.localStorage.getItem('token');
    this.isloggeduser.next(true);
    console.log(value)
    this.userdata.uid=value ||'';
    this.addusersdata();

  }


  adduserdata(userdata:Userinfo){

       this.userdata=userdata;

  }

  addusersdata() {
   if(this.userdata.email.length!=0){
    this.userdata.id = this.firestore.createId();
    return this.firestore.collection('/usersdata').add(this.userdata);
   }
   return

  }
  // getusers() {
  //   return (
  //     this.firestore
  //       .collection('/usersdata')
  //       // .valueChanges({ idField: 'id' });
  //       .snapshotChanges()
  //   );
  // }


  // getuserdata(){

  //   this.fireauth.currentUser.then( data  => {
  //     console.log(data?.uid)
  //      this.user=data?.email||'';
  //   })
  //   this.allusersdata.map(data => {
  //    if(data.email==this.user){
  //      this.userdata=data;
  //      localStorage.setItem('name',data.firstname +" "+ data.lastname)
  //      localStorage.setItem('email',data.email)

  //    }
  //    return this.userdata;

  //    } )

  // }
    // getuser(value:string) {
  //   return (
  //     this.firestore
  //       .collection('/usersdata', ref => ref.where('uid', '==', value))
  //       // .valueChanges({ idField: 'id' });
  //       .snapshotChanges()
  //   );
  // }
  async  getuser(value:string) {
    try {
      const snapshot = await this.firestore
        .collection('/usersdata')
        .ref.where('uid', '==', value)
        .get();
      return snapshot.docs;
    } catch (error) {
      throw error;
    }
  }

  update(id: string, data: Userinfo): Promise<void> {
    return this.firestore.collection('/usersdata').doc(id).update(data);
  }



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

  logout(){


    this.fireauth.signOut().then(() =>{
      localStorage.removeItem('token')
      localStorage.removeItem('uid')
      this.isloggeduser.next(false);
      this.userdata.firstname='user name'

      this.route.navigate(['/login']);
    },err=>{
      alert(err.message)
    })
  }
  get userstate():boolean{
    return (localStorage.getItem('token'))?true:false;
  }
  userstatuschange():Observable<boolean>{
    return this.isloggeduser.asObservable();
  }

}
