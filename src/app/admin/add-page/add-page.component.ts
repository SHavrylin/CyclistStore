import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      category: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const product = {
      category: this.form.value.category,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    };
    console.log(this.form);
    this.productService.create(product).subscribe(res => console.log(res));
    this.form.reset();
    this.submitted = false;
    this.router.navigate(['/']);
  }
}
