import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/productservice';
import { Product } from '../../interface/product';

interface Column {
  field: string;
  header: string;
  sortable: boolean;
}

@Component({
  selector: 'app-table',
  imports: [TableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [ProductService],
})
export class TableComponent {
  products!: Product[];

  cols!: Column[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().then((data) => {
      this.products = data;
    });

    this.cols = [
      { field: 'code', header: 'Code', sortable: false },
      { field: 'name', header: 'Name', sortable: true },
      { field: 'category', header: 'Category', sortable: true },
      { field: 'quantity', header: 'Quantity', sortable: true },
      { field: 'rating', header: 'Rating', sortable: false },
    ];
  }
}
