import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok"
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;
  // this gets injected in but I don't know how
  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    //this.store.dispatch(new fromStore.LoadPizzas());
    this.pizzas$ = this.store.select(fromStore.getAllPizzas);
    // moving here so toppings are loaded and ready to go from here on out
    this.store.dispatch(new fromStore.LoadToppings());

    // if we refresh on a product item these won't get refreshed becasue there is no route guard at the moment
  }
}
