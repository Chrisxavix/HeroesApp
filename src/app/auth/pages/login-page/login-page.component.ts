import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }

  onLogin(): void {
    this.authService.login("1").subscribe(resp => {
      if(!resp) return;
      console.log(resp, " login");
      this.router.navigate(['/heroes/list'])
    })
  }
}
