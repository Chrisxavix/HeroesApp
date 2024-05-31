import { Hero } from './../../interfaces/hero.interface';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher } from '../../interfaces/hero.interface';
import { log } from 'console';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent {

  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
  ) {

  }

  public heroForm = new FormGroup({
    id:               new FormControl<string>(""),
    superhero:        new FormControl<string>("", { nonNullable: true }),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(""),
    first_appearance: new FormControl(""),
    characters:       new FormControl(""),
    alt_img:          new FormControl("")
  })

  public publishers = [
    { id: "DC Comics" , desc: "DC Comics"},
    { id: "Marvel Comics" , desc: "Marvel Comics"}
  ]

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void {
    if(this.heroForm.invalid) return;
    if(this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe(resp => {
        console.log(resp, "update-detalle");
      })
    return;
    }
    //this.currentHero.id = "dc" + this.heroForm.value.superhero;
      this.heroesService.addHero(this.currentHero).subscribe(resp => {
        console.log(resp, "new-detalle");
      })
  }
}
