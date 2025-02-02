import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interface/pokemon';
import { PokemonService } from '../../service/pokemonservice';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

interface Column {
  field: string;
  header: string;
  sortable: boolean;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule, ProgressSpinnerModule],
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
      { field: 'image', header: 'Image', sortable: false },
      { field: 'name', header: 'Name', sortable: true },
      { field: 'id', header: 'ID', sortable: false },
      { field: 'height', header: 'Height', sortable: true },
      { field: 'weight', header: 'Weight', sortable: true },
    ];
  }
}
