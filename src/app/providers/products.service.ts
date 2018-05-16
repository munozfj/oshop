import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  objectName = 'Products';
  productsCollection: AngularFirestoreCollection<Product>;
  productsDocument: AngularFirestoreDocument<Product>;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>(this.objectName, ref =>
      ref.orderBy('name', 'asc')
    );
  }

  getProducts() {
    return this.productsCollection.snapshotChanges().map(actions =>
      actions.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;

        return data;
      })
    );
  }

  getProduct(id: string): Observable<Product> {
    this.productsDocument = this.afs.doc<Product>(`${this.objectName}/${id}`);
    return this.productsDocument.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        console.log('devuelve null');
        return null;
      } else {
        const data = action.payload.data() as Product;
        data.id = action.payload.id;
        console.log(data);
        return data;
      }
    });
  }

  insetProduct(product: Product) {
    this.productsCollection.add(product);
  }

  updateProduct(product: Product) {
    this.productsDocument = this.afs.doc(`${this.objectName}/${product.id}`);
    this.productsDocument.update(product);
  }

  deleteProduct(product: Product) {
    this.productsDocument = this.afs.doc(`${this.objectName}/${product.id}`);
    this.productsDocument.delete();
  }
}
