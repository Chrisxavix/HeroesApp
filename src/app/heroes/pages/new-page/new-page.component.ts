import { Hero } from './../../interfaces/hero.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent implements OnInit {

  public hero?: Hero;
  public title: string = "AGREGAR";

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    if(!this.router.url.includes("edit")) return;
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroeById(id) )
      ).subscribe( hero => {
        if(!hero) return this.router.navigateByUrl("/");
        this.title = "EDITAR";
        this.heroForm.reset(hero);
        return;
      })
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
      this.heroesService.updateHero(this.currentHero)
      .subscribe(resp => {
        this.showSnackBar("Se actualizó correctamente el registro");
      })
      this.router.navigate(['/heroes/list'])
    return;
    }
    this.currentHero.id = "cod-" + this.heroForm.value.superhero;
    this.heroesService.addHero(this.currentHero)
    .subscribe(resp => {
      this.showSnackBar("Se creó correctamente el registro");
    })
    this.router.navigate(['/heroes/list'])
  }

  onDeleteHero(): void {
    if(!this.currentHero.id) throw Error("El id del héro es requerido");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.heroesService.deleteHeroById(this.currentHero.id)
        .subscribe(resp => {
          if(resp) {
            this.showSnackBar("Se eliminó correctamente el registro");
            this.router.navigate(['/heroes/list'])
          }
        })
    });
  }

  showSnackBar(mesage: string): void {
    this.matSnackBar.open(mesage, "ok", { duration: 4000})
  }
}
