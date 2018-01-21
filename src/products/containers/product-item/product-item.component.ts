import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import * as fromStore from '../../store';

import { Pizza } from '../../models/pizza.model';

import { Topping } from '../../models/topping.model';

// down here V the async pipe subscribes to pizza$ without subscribing in the ts component file
// when you pass it an observable it does this automatically. It also will unsubscribe so no ng on destroy is needed
@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
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
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  // if a refresh is done at the moment of this commit, the pizza info will disappear but we will be adding route guards to make sure
  // the pizza is loaded before we show it....
  ngOnInit() {
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      // there should be a better way of doing this
      tap((pizza: Pizza = null) => {
        //casting to an boolean...
        const pizzaExists = !!(pizza && pizza.toppings);
        // give us a new array of pizza ids or an empty array...
        const toppings = pizzaExists
          ? pizza.toppings.map(topping => topping.id)
          : [];
        // visualize a pizza with its current toppings by updating the state which are visualze object is watching and therefore to
        // pizza is changed. this is more like update pizza toppings....
        this.store.dispatch(new fromStore.VisualizeToppings(toppings));
      })
    );

    this.toppings$ = this.store.select(fromStore.getAllToppings);
    // doing less state management in this class now. Still not 100% on this way of doing things and sharing the state for selectedPizzas
    // this is using a selector and is subscribed to a selection of state which is what we are updating
    this.visualise$ = this.store.select(fromStore.getPizzaVisualized);
  }

  onSelect(event: number[]) {
    // this returns an array of ids of toppings. not the objects
    //console.log('onSelect:::', event);
    // this will get us a new pizza every time we dispatch. Our view is subscribed to an observable pizza
    // TODO is a store shared by diff windows in browser? So it looks like every new tab gets its own store... so maybe no problem here.
    // This does raise more questions about if sharing a store for diff tabs is a good idea or something you may want...
    // this following dispatch updates the state which is then reflected in the view via observables
    this.store.dispatch(new fromStore.VisualizeToppings(event));
  }
  // process is create actions then bind to component
  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.CreatePizza(event));
  }

  onUpdate(event: Pizza) {}

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
    }
  }
}
