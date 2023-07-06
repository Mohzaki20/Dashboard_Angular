import { ICategory } from '../models/IProduct';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { UserInfo } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Userinfo } from '../models/userinfo';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}
  // Add product to Firestore collection
  addProduct(product: ICategory,category: string) {
    product.id = this.firestore.createId();
    return this.firestore.collection(`/${category}`).add(product);
  }

  // Update product in Firestore collection
  updateProduct(product: ICategory,category: string) {
    return this.firestore.doc(`/${category}/` + product.id).update(product);
    // return this.firestore.doc('categories').update(product);
    // return this.firestore
    //   .collection('/categories')
    //   .doc(product.id)
    //   .update(product);
    // this.firestore
    //   .collection('products')
    //   .doc(product.id)
    //   .get()
    //   .subscribe((doc) => {
    //     if (doc.exists) {
    //       const data = doc.data() as ICategory;
    //       this.prdDetails.setValue({
    //         id: data.id,
    //         price: data.price,
    //         title: data.title,
    //         images: data.images,
    //         sellerID: data.SellerId,
    //         brand: data.brand,
    //       });
    //     }
    //   });
    // this.deleteProduct(product);
    // this.addProduct(product);
  }

  // Delete product from Firestore collection
  deleteProduct(product: ICategory,category: string) {
    return this.firestore.collection(`/${category}`).doc(product.id).delete();
    // return this.firestore.doc(`/${category}/`+ product.id).delete();
  }

  // Get all products from Firestore collection
  getProducts(category: string) {
    return (
      this.firestore
        .collection(`/${category}`)
        // .valueChanges({ idField: 'id' });
        .snapshotChanges()
    );
  }

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

  // update(id: string, data: Userinfo): Promise<void> {
  //   return this.firestore.collection('/usersdata').doc(id).update(data);
  // }

}
