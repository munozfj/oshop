import { Component } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { Router } from '@angular/router';
import { UsersService } from './providers/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService
  ) {
    authService.user$.subscribe(user => {
      if (!user) {
        return;
      }

      this.usersService.save(user);
      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) {
        return;
      }
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
