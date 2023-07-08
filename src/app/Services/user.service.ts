import { Injectable } from '@angular/core';
import { Userinfo } from '../models/userinfo';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of, switchMap } from 'rxjs';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  //  query = this.collectionRef.where('fieldName', '==', 'fieldValue');


  constructor(private firestore: Firestore, private authService: AuthService) {}

  get currentUserProfile$(): Observable<Userinfo | null> {
    console.log()
    return this.authService.currentUser$.pipe(

      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }


        const ref = doc(this.firestore, 'usersdata', user?.uid);

        return docData(ref) as Observable<Userinfo>;

      })
    );
  }

  addUser(user: Userinfo): Observable<void> {
    const ref = doc(this.firestore, 'usersdata', user.uid);
    return from(setDoc(ref, user));

  }

  updateUser(user: Userinfo): Observable<void> {
    const ref = doc(this.firestore, 'usersdata', user.uid);
    return from(updateDoc(ref, { ...user }));
  }

  // filterBy(value:string) {
  //   this.avisos = this.db.collection('/usersdata', ref => ref.where('uid','==',value )).valueChanges()
  //   return this.avisos;
  // };



}
