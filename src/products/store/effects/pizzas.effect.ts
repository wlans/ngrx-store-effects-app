import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServies from '../../services';

@Injectable()
export class PizzaEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServies.PizzasService
  ) {}

  @Effect() // you can do dispatch false here if you don't want to dispatch ...
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    // what does switch map do???
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        // how does map work?
        map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
      );
    })
  );
}
