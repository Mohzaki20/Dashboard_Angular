import { ICategory } from '../models/ICategory';

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<ICategory>;
  productDoc: AngularFirestoreDocument<ICategory>;
  prdDetails!: FormGroup;
  constructor(private firestore: AngularFirestore) {
    // this.productsCollection = this.firestore.collection<ICategory>(`/${category}`);
  }
  // Add product to Firestore collection
  addProduct(product: ICategory, category: string) {
    product.id = this.firestore.createId();
    return this.firestore.collection(`/${category}`).add(product);
  }

  // Fetch Single Product Object
  GetProduct(id: string, category: string): AngularFirestoreDocument<ICategory> {
    this.productDoc = this.firestore.doc<ICategory>(`${category}/` + id);
    return this.productDoc;
  }

  // Get all products from Firestore collection
  getProducts(category: string) {
    return this.firestore.collection(`${category}`).snapshotChanges();
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
}
