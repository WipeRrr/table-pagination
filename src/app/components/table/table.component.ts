import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/productservice';
import { Product } from '../../interface/product';


interface Column {
  field: string;
  header: string;
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
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'rating', header: 'Rating' },
    ];
  }
}