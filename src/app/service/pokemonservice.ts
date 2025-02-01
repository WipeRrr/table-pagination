import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string; // Добавляем поле для изображения
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getAllPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<{ results: { name: string; url: string }[] }>(
        `${this.apiUrl}?limit=500`
      )
      .pipe(
        switchMap((response) => {
          const requests = response.results.map((pokemon) =>
            this.getPokemonDetails(pokemon.url)
          );
          return forkJoin(requests);
        })
      );
  }

  private getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<any>(url).pipe(
      map((data) => {
        console.log('Pokemon data:', data); // Проверяем структуру данных
        return {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          image: data.sprites?.other.home.front_default || '', // Ссылка на изображение
        };
      })
    );
  }
}
