import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Category } from '../models/category';
import 'rxjs/add/operator/map';
import { map } from 'rxjs-compat/operator/map';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesCollection:  AngularFirestoreCollection<Category>;

  constructor( private afs: AngularFirestore) {
    this.categoriesCollection = afs.collection<Category>('Categories', ref => ref.orderBy('name', 'asc'));
   }

   getCategories() {
    return this.categoriesCollection.snapshotChanges().map(actions => actions.map( a => {
        const data = a.payload.doc.data() as Category;
        data.id = a.payload.doc.id;
        return data;
      })
    );
   }

}
