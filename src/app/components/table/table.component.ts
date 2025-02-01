import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interface/pokemon';
import { PokemonService } from '../../service/pokemonservice';


interface Column {
  field: string;
  header: string;
  sortable: boolean;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [PokemonService],
})
export class TableComponent implements OnInit {
  pokemons!: Pokemon[];
  cols!: Column[];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getAllPokemons().subscribe((data) => {
      this.pokemons = data;
    });

    this.cols = [
      { field: 'id', header: 'ID', sortable: true },
      { field: 'name', header: 'Name', sortable: true },
      { field: 'height', header: 'Height', sortable: true },
      { field: 'weight', header: 'Weight', sortable: true },
      { field: 'image', header: 'Image', sortable: false }, // Новая колонка для изображения
    ];
  }
}
