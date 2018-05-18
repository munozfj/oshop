import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../../providers/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../../models/product';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular5-data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  // filteredProducts: Product[];
  subscription: Subscription;

  itemResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount = 0;

  constructor( private prodService: ProductsService) { }

  ngOnInit() {
      this.subscription = this.prodService.getProducts().subscribe( prods => {
          this.products = prods;
          this.initializeTable(this.products); });
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    const filteredProducts = (query) ? this.products.filter( p => p.name. toLowerCase().includes(query.toLowerCase()) ) : this.products;
    this.initializeTable(filteredProducts);
  }

  reloadItems(params) {
    if ( !this.itemResource ) {return null; }
    this.itemResource.query(params).then(items => this.items = items);
  }

  private initializeTable( products: Product[]) {
    this.itemResource = new DataTableResource(products);
    this.itemResource.query({ offset: 0}).then(items => this.items = items );
    this.itemResource.count().then(count => this.itemCount = count );
  }

}
