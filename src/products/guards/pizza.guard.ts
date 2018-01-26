// the guard will stop loading to many time also because we are checking if the pizzas were loaded already

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/Operators';

// getting our store because we want to dispatch action and use selectors which we have not used yet
import * as fromStore from '../store';

@Injectable()
export class PizzasGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> | Promise<boolean> {
    return this.checkStore().pipe(
      // returns an observable which we can switchmap. then our can active is subscribing to one
      //    of our ofs. why can't we just return a boolean
      //    from our method? TODO maybe because it is hard to handle error there?
      switchMap(() => of(true)),
      catchError(() => of(false))
    ); // if the swtichmap gets hit we return true cause it was successful
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      // pizzasloaded returns an observable boolean
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPizzas()); // tap does not touch the observable
          // steam, so its almost like it was never there
        }
      }),
      filter(loaded => loaded), // if loaded is false the stream will not continue... this is watching for the dispatch to finish
      take(1) // when loaded is true we do this TODO understand this and filter. take one value from filter
      // and cal observable complete which means the observable steam is
      // done and we can unsubscribe automatically
    );
  }
}
