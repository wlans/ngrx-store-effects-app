import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromStore from "../../store";

import { Pizza } from "../../models/pizza.model";

import { Topping } from "../../models/topping.model";

// down here V the async pipe subscribes to pizza$ without subscribing in the ts component file
// when you pass it an observable it does this automatically. It also will unsubscibe so no ngondestroy is needed
@Component({
  selector: "product-item",
  styleUrls: ["product-item.component.scss"],
  template: `
    <div
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise">
        </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise: Pizza;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  // if a refresh is done at the moment of this commit, the pizza info will disappear but we will be adding route guards to make sure
  // the pizza is loaded before we show it....
  ngOnInit() {
    this.store.dispatch(new fromStore.LoadToppings());
    this.pizza$ = this.store.select(fromStore.getSelectedPizza);
    this.toppings$ = this.store.select(fromStore.getAllToppings);
  }

  onSelect(event: number[]) {
    // this returns an array of ids of toppings. not the objects
    console.log("onSelect:::", event);
  }

  onCreate(event: Pizza) {}

  onUpdate(event: Pizza) {}

  onRemove(event: Pizza) {
    const remove = window.confirm("Are you sure?");
    if (remove) {
    }
  }
}
