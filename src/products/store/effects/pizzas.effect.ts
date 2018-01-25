import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

// TODO look up how you could use a typescript path to get relative path easier
// reason we use index ts is because it makes getting the exports easier. we would have to go further down the chain to get what we want
import * as fromRoot from '../../../app/store';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';
import { CreatePizzaSuccess, REMOVE_PIZZA_SUCCESS } from 'src/products/store';

@Injectable()
export class PizzaEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  @Effect() // you can do dispatch false here if you don't want to dispatch ...
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    // what does switch map do???.. Switch map ignores the inbound observable if the above function has been called again.
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        // TODO how does map work?
        map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
      );
    })
  );

  @Effect()
  createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA).pipe(
    // we just want the payload from the action...
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .createPizza(pizza)
        .pipe(
          map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
          catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
        );
    })
  );

  //  reason for effects is to listen to events because they are side effects

  @Effect()
  createPizzaSuccess$ = this.actions$ // our reducer will pick this up first then this will get called
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
      map(pizza => {
        return new fromRoot.Go({ path: ['/products', pizza.id] });
      })
    );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA).pipe(
    // we just want the payload from the action...
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .updatePizza(pizza)
        .pipe(
          map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
          catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
        );
    })
  );

  @Effect()
  removePizza$ = this.actions$.ofType(pizzaActions.REMOVE_PIZZA).pipe(
    // we just want the payload from the action...
    map((action: pizzaActions.RemovePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .removePizza(pizza)
        .pipe(
          map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
          catchError(error => of(new pizzaActions.RemovePizzaFail(error)))
        );
    })
  );

  @Effect() // listening to two  actions....
  handlePizzaSuccess$ = this.actions$
    .ofType(
      pizzaActions.UPDATE_PIZZA_SUCCESS,
      pizzaActions.REMOVE_PIZZA_SUCCESS
    )
    .pipe(
      map(pizza => {
        return new fromRoot.Go({
          path: ['/products']
        });
      })
    );
} // end of class

// all effects must return an action so they can dispatch it unless dispatch is set to false
// http gives back an Observable
