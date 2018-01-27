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
    // just binding a selector here no more dispatch
    this.pizzas$ = this.store.select(fromStore.getAllPizzas);
  }
}

// if we refresh on a product item these won't get refreshed because there is no route guard at the moment// this is fixed now check products module
