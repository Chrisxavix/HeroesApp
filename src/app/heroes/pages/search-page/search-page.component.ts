import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  public heroes?: Hero[] = [];
  //filteredOptions: Observable<string[]>;

  constructor(
    private heroesService: HeroesService,
  ) {

  }

  ngOnInit() {
    /* this.filteredOptions = this.searchInput.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    ); */
  }

  searchHero(): void {
    const value: string = this.searchInput.value || "";
    this.heroesService.getSuggestion(value).subscribe( heroes => {
      this.heroes = heroes;
      console.log(this.heroes, "  GET");

    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
