import { ICategory } from '../Models/ICategory';

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { messages } from '../Models/photos';
@Injectable({
  providedIn: 'root',
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<ICategory>;
  productDoc: AngularFirestoreDocument<ICategory>;
  prdDetails!: FormGroup;
  constructor(private firestore: AngularFirestore,private toast: ToastrService ) {
    // this.productsCollection = this.firestore.collection<ICategory>(`/${category}`);
  }
  // Add product to Firestore collection
  async addProduct(product: ICategory, category: string) {
    product.id = this.firestore.createId();
    return await this.firestore.collection(`/${category}`).add(product).then(()=>{
      this.toast.success('you have add product successfully')
    }).catch(err => {
      this.toast.error('some error occured')
    });
  }

  // Fetch Single Product Object
  GetProduct(id: string, category: string): AngularFirestoreDocument<ICategory> {
    this.productDoc = this.firestore.doc<ICategory>(`${category}/` + id);
    return this.productDoc;
  }

  // Get all products from Firestore collection
  getProducts(category: string,value: string) {
    return this.firestore.collection(`${category}`,ref => ref.where('SellerId', '==', value)).snapshotChanges();
  }


  // Update product in Firestore collection
  UpdateProduct(product: ICategory, id: string, category: string) {
    this.productDoc = this.firestore.doc<ICategory>(`${category}/` + id);
    this.productDoc.update(product);
  }

  // Delete product from Firestore collection
  deleteProduct(product: ICategory, category: string) {
    return this.firestore.collection(`${category}`).doc(product.id).delete();
  }


   addmsg(product: messages) {
    product.id = this.firestore.createId();
    return  this.firestore.collection('usersmsg').add(product).then(()=>{
      this.toast.success('you have add message successfully')
    }).catch(err => {
      this.toast.error('some error occured')
    });
  }

  getmsg(value: string) {
    return this.firestore.collection('usersmsg',ref => ref.where('uid', '==', value)).snapshotChanges();
  }
}
