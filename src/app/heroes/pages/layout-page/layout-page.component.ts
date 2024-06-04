import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interfaces';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent implements OnInit{

  public user?: User;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  public sidebarItems = [
    { label: "Listado", icon: "label", url: "./list" },
    { label: "Añadir", icon: "add", url: "./new-hero" },
    { label: "Buscar", icon: "search", url: "./search" }
  ]

  logout(): void {
    this.authService.logout();
    this.router.navigate(["auth"]);
  }


}
