import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product$;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.product$ = this.route.params
      .pipe(switchMap(value => {
        return this.productService.getProductById(value['id']);
      }));
  }

}
