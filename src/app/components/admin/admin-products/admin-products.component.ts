import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../../providers/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../../models/product';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor( private prodService: ProductsService) { }

  ngOnInit() {
      this.subscription = this.prodService.getProducts().subscribe( prods => this.filteredProducts = this.products = prods);
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ? this.products.filter( p => p.name. toLowerCase().includes(query.toLowerCase()) ) : this.products;

  }

}
