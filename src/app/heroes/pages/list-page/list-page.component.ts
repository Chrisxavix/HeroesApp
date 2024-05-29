import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { log } from 'console';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit{

  public heroes: Hero[] = [];

  constructor(
    public heroesService: HeroesService
  ) {

  }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe( data => {
      this.heroes = data;
    })
  }


}
