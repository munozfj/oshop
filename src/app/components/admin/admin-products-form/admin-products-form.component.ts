import { ProductsService } from './../../../providers/products.service';
import { Category } from './../../../models/category';
import { CategoriesService } from './../../../providers/categories.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-admin-products-form',
  templateUrl: './admin-products-form.component.html',
  styleUrls: ['./admin-products-form.component.css']
})
export class AdminProductsFormComponent implements OnInit {
  categories$: Observable<Category[]>;
  product: Product = {
    id: '',
    name: '',
    price: 0.0,
    categoryId: '',
    url: ''
  };
  loaded = false;

  constructor(
    private catService: CategoriesService,
    private prodService: ProductsService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categories$ = this.catService.getCategories();

    /*   this.catService.getCategories().subscribe( arr =>     {
      for ( const cat of arr ) { console.log(cat); }
    } ); */
    const id = this.actRoute.snapshot.paramMap.get('id');
    // console.log(id);
    if (id) {
      this.prodService
        .getProduct(id)
        .take(1)
        .subscribe(p => {
          // console.log('p:'); console.log(p);
          this.product = p;
          this.product.id = id;
          this.loaded = true;
        });
    }
    this.loaded = true;
  }

  onSubmit(f: NgForm) {
    console.log(f);
    if (f.valid && f.dirty ) {
      if ( this.product.id) {
        console.log('update');
        this.prodService.updateProduct(this.product);
      } else {
        console.log('insert');
        this.prodService.insetProduct(this.product);
      }


      // TODO ng2-toastr
      this.router.navigate(['/admin/products']);
    }
  }

  onDelete() {
    if ( !confirm('Are you sure you want to delete the product: ' + this.product.name + '?')) {  return null; }

    this.prodService.deleteProduct(this.product);
    this.router.navigate(['/admin/products']);
  }
}
