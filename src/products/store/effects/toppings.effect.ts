import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/Observable/of";
import { map, catchError, switchMap } from "rxjs/operators";

import * as toppingsActions from "../actions/toppings.action";
import * as fromServices from "../../services/toppings.service";

// Injectable mean that this class can have stuff injected into it
@Injectable()
export class ToppingsEffects {
  constructor(
    private action$: Actions,
    private toppingsService: fromServices.ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this.action$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService.getToppings().pipe(
        // TODO  don't understand how this map works. I thought maps take in each element and do something on them
        map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
        catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
      );
    })
  );
}
