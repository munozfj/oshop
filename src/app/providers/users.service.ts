import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection: AngularFirestoreCollection<Users>;
  users: Observable<Users[]>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<Users>('users');
    this.users = this.usersCollection.valueChanges();
  }

  save( user: firebase.User) {
      const appUser: Users = {
        name: user.displayName,
        email: user.email
       };
      this.usersCollection.doc(user.uid).update(appUser);
    }
}
