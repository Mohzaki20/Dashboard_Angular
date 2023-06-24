import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct} from './models';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) {
      // Add product to Firestore collection
  addProduct(product: IProduct) {
    return this.firestore.collection('products').add(product);
  }

  // Update product in Firestore collection
  updateProduct(product: IProduct) {
    return this.firestore.collection('products').doc(product.id).update(product);
  }

  // Delete product from Firestore collection
  deleteProduct(productId: string) {
    return this.firestore.collection('products').doc(productId).delete();
  }

  // Get all products from Firestore collection
  getProducts() {
    return this.firestore.collection('products').valueChanges({ idField: 'id' });
  }
   }
}
