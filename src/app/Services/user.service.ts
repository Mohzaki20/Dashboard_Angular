import { Injectable } from '@angular/core';
import { Userinfo } from '../models/userinfo';
import { AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  avisos!:any;
  private dbPath = '/usersdata';
  value:string='';
  collectionRef = this.db.collection('/usersdata');
  //  query = this.collectionRef.where('fieldName', '==', 'fieldValue');

  constructor(private db: AngularFirestore) {
  }


  filterBy(value:string) {
    this.avisos = this.db.collection('/usersdata', ref => ref.where('uid','==',value )).valueChanges()
    return this.avisos;
  };
  // getdatabyID(){
  //   this.tutorialsRef.doc('someid').snapshotChanges().subscribe(
  //     res => {
  //       this.item= { id: res.payload.id, ...res.payload.data() as Userinfo };
  //     },
  //     err => {
  //       console.debug(err);
  //     }
  //   )
  // }


  // create(tutorial: Userinfo): any {
  //   return this.tutorialsRef.add({ ...tutorial });
  // }

  // update(id: string, data: any): Promise<void> {
  //   return this.tutorialsRef.doc(id).update(data);
  // }

  // delete(id: string): Promise<void> {
  //   return this.tutorialsRef.doc(id).delete();
  // }
}