import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { Observable, catchError, map, of } from 'rxjs';
import { enviroments } from '../../../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = enviroments.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroeById(heroeId: string): Observable<Hero | undefined> {
    return  this.http.get<Hero>(`${this.baseUrl}/heroes/${heroeId}`)
      .pipe(
        catchError( error => of(undefined))
      )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if(!hero.id) throw Error("Hero is requiered");
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(heroeId: string): Observable<boolean> {
    return this.http.delete<Hero>(`${this.baseUrl}/heroes/${heroeId}`)
      .pipe(
        map( resp => true),
        catchError( error => of(false))
      )
  }

  getSuggestion(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

}
