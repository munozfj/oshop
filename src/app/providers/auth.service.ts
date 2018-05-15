import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor( private afAuth: AngularFireAuth,
                      private actRoute: ActivatedRoute) {
    this.user$ = afAuth.authState;
    this.user$.subscribe( x => console.log(x));
   }

  login() {
    const returnUrl = this.actRoute.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider() );
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
