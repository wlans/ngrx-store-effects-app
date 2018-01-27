import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap, filter, take, switchMap, catchError } from 'rxjs/Operators';

// getting our store because we want to dispatch action and use selectors which we have not used yet
import * as fromStore from '../store';

import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzaExistsGuards implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.pizzaId, 10);
        return this.hasPizza(id);
      })
    );
  }

  // the  entities are a object map
  hasPizza(id: number): Observable<boolean> {
    return this.store
      .select(fromStore.getPizzasEntities)
      .pipe(
        map((entities: { [key: number]: Pizza }) => !!entities[id]),
        take(1)
      ); // the !! casts it to boolean aka the double bang...
  }
  // route guards are  async
  // check store is the first observable stream to kick off
  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      // pizzasloaded returns an observable boolean
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPizzas()); // tap does not touch the observable
          // steam, so its almost like it was never there
        }
      }),
      filter(loaded => loaded), // TODO not sure why we are doing thiss if loaded is false the stream will not continue... this is watching for the dispatch to finish
      take(1) // when loaded is true we do this TODO understand this and filter. take one value from filter
      // and cal observable complete which means the observable steam is
      // done and we can unsubscribe automatically
    );
  }
}
