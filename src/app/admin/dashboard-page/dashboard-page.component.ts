import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products = [];
  prSubs: Subscription;
  delPrSubs: Subscription;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.prSubs = this.productService.getAllProducts().subscribe(products => {
      console.log(products);
      this.products = products;
    });
  }

  ngOnDestroy() {
    if (this.prSubs) {
      this.prSubs.unsubscribe();
    }
    if (this.delPrSubs) {
      this.delPrSubs.unsubscribe();
    }
  }

  delete(id) {
    this.prSubs = this.productService.delete(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }
}
